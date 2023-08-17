import { useContext ,useState} from "react";
import "./comments.scss"
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import moment from "moment";
import { useQuery } from "react-query";
import { useMutation,useQueryClient } from "react-query";

const Comments = ({postId}) => {
    const {currentUser} = useContext(AuthContext);
    const [desc , setDesc] = useState("");
   
    const {isLoading, error, data } = useQuery(["comments"],()=>
      makeRequest.get("/comments?postId="+postId).then((res)=>{
        return res.data;
      })
    );
  //  console.log(data);
  const queryClient = useQueryClient();
  
  const mutation = useMutation((newComment)=>{
    // console.log(newComment);
    return makeRequest.post("/comments", newComment)
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  })
  

  const handleClick= async (e)=>{
    e.preventDefault();
    mutation.mutate({desc, postId}); 
    setDesc("");
  }

  return (
    <div className="comments">
        <div className="write">
            <img src={currentUser.profilePic} alt="" />
            <input type="text" placeholder="Write a comment" value={desc} onChange={e=>setDesc(e.target.value)} id="" />
            <button onClick={handleClick}>Send</button>
        </div>

        {error? "Something went wrong" : isLoading? "Loading" 
          :data.map((comment)=>{
            return <div className="comment">
                <img src={comment.profilePic} alt="" />
                <div className="info">
                    <span>{comment.name}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className="date">{moment(comment.createdAt).fromNow()}</span>
            </div>
        })}
    </div>
  )
}

export default Comments;

