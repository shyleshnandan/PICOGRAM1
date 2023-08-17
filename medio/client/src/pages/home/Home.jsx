import Posts from "../../component/posts/Posts";
import Share from "../../component/share/Share";
import { Stories } from "../../component/stories/Stories";
import "./home.scss"


const Home = () => {
  return (
    <div className="home">
      <Stories />
      <Share />
      <Posts/>
    </div>
  )
}

export default Home;