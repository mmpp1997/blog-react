import "./Post.css";
import { useState, useEffect } from "react";

function Post(props) {
    const [clickedPost, setClickedPost] = useState(false);
    useEffect(() => {
        console.log(clickedPost);
    }, [clickedPost]);

    function postClicked(id) {
        console.log("clicked post " + id);
        setClickedPost((prev) => {
            return (true);
        })
    }

    return (
        <div className="post" style={{ borderColor: clickedPost ? props.post.color : "transparent" }} onClick={() => { postClicked(props.post.id) }}>
            <input type="text" className="post-title" value={props.post.title} disabled={true}/>
            {/* Part thats shown when post is clicked */}
            <div className="post-body" style={{ display: clickedPost ? "block" : "none" }}>
                <p>User {props.post.nickname} asked in <span className="topic" style={{backgroundColor: props.post.color}}>{props.post.topic}</span>:</p>
                <textarea className="post-text" defaultValue={props.post.text}/>
                <div>
                    <input className="edit post-btn" type="button" value="Edit post"/>
                    <input className="delete post-btn" type="button" value="Delete post"/>
                </div>
            </div>

            {/* Part thats shown when post is not clicked */}
            <div style={{ display: clickedPost ? "none" : "block" }}>
                <div className="separator" style={{ backgroundColor: clickedPost ? "transparent" : props.post.color }} />
                <div className="aditional-info">
                    <p>{props.post.nickname}</p>
                    <p className="topic" style={{backgroundColor: props.post.color}}>{props.post.topic}</p>
                </div>
            </div>



        </div>
    );
}

export default Post;