import { useState } from "react";
import "./Post.css";
import SmallPost from "./SmallPost/SmallPost";
import BigPost from "./BigPost/BigPost";

function Post(props) {
    const [clickedPost, setClickedPost] = useState(false);

    function postClicked() {
        setClickedPost((prev) => {
            return (!prev);
        })
    };

    return (
        <div className="post">
        {!clickedPost ? <SmallPost post={props.post} clicked={()=>{postClicked()}}/>:<BigPost post={props.post} clicked={()=>{postClicked()}}/>}
        </div>
    );
}

export default Post;