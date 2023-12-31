import { useState } from "react";
import "./NewPost.css";
import NewPostForm from "../NewPostForm/NewPostForm";

function NewPost() {
    const [clickAdd,setClickedAdd]=useState(false);

    function addPost() {
        setClickedAdd((prev)=>{return !prev});
    }
    return (
        <div className="add-div">
            {/* add button */}
            <div className="new-post-btn" style={{display: clickAdd ? "none" : "block"}}>
                <input className="add-btn" type="button" value="New Post" onClick={addPost} />
            </div>
            {/* add form */}
            {clickAdd && <NewPostForm clicked={addPost}/>}
        </div>
    );
}
export default NewPost;