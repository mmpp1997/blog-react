import { useState } from "react";
import "./NewPost.css";
import PostForm from "../PostForm/PostForm";

function NewPost() {
    const [clickAdd,setClickedAdd]=useState(false);

    function addPost() {
        console.log("clicked add post");
        setClickedAdd(true);
    }
    return (
        <div className="add-div">
            {/* add button */}
            <div className="new-post-btn" style={{display: clickAdd ? "none" : "block"}}>
                <input className="add-btn" type="button" value="New Post" onClick={addPost} />
            </div>
            {/* add form */}
            {clickAdd && <PostForm clicked={setClickedAdd}/>}
        </div>
    );
}
export default NewPost;