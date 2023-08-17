import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import moment from "moment";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useMutation,useQueryClient } from "react-query";

export const Post = ({post}) => {

    const {currentUser} = useContext(AuthContext);
    const [comment, setComment] = useState(false);
    const {isLoading, error, data } = useQuery(['likes', post.id],()=>
    makeRequest.get("/likes?postId="+post.id).then((res)=>{
      return res.data;
    })
  );  

  const queryClient = useQueryClient();
  
  const mutation = useMutation((liked)=>{
    if (liked) return makeRequest.delete("/likes?postId="+ post.id)
    return makeRequest.post("/likes/",{postId:post.id})
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries(["likes",post.id]);
    },
  })

  const handleLike=()=>{

    mutation.mutate(data.includes(currentUser.id));
  }

  // console.log(data);
  
  return (
    <div className="post">
        <div className="container">
        <div className="user">
            <div className="userInfo">
                <img src={post.profilePic} alt="" />
                <div className="details">
                    <Link to={`/profile/${post.userId}`} style={{textDecoration: "none", color: "inherit"}}>
                    <span className="name">{post.name}</span>
                    </Link>
                    <span className="date">{moment(post.createdAt).fromNow()}</span>
                </div>
                
            </div>
            <MoreHorizIcon />
        </div>
        <div className="content">
            <p>{post.desc}</p>
            {post.img!=null&&<img src={"./upload/"+post.img} alt="" />}
        </div>
        <div className="info">
          {isLoading? "loading" :<>
            <div className="item">
                { data.includes(currentUser.id)?< FavoriteOutlinedIcon style={{color:"red"}} onClick={handleLike}/>: <FavoriteBorderOutlinedIcon/>}
                {data.length} likes
            </div></>}
            <div className="item" onClick={()=>setComment(!comment)}>
                <TextsmsOutlinedIcon />
                2 Comments
            </div>
            <div className="item">
                <ShareOutlinedIcon />
                12 shares
            </div>
        </div>
        {comment && <Comments postId={post.id}/>}
        
        </div>

        
    </div>
  )
}
