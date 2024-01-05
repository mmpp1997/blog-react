import axios from "axios";
import { useState} from "react";
import "./Post.css";

function Post(props) {
    const [clickedPost, setClickedPost] = useState(false);

    function postClicked(id) {
        setClickedPost((prev) => {
            return (true);
        })
    };

    //delete post function
    async function deletePost(id) {
        try {
            await axios.post('http://localhost:3001/delete', {id:id}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form name="editForm" className="post" style={{ borderColor: clickedPost ? props.post.color : "transparent" }} onClick={() => { postClicked(props.post.id) }}>
            <input name="title" type="text" className="post-title" value={props.post.title} disabled={true} />
            {/* Part thats shown when post is clicked */}
            <div className="post-body" style={{ display: clickedPost ? "block" : "none" }}>
                <p>User {props.post.nickname} asked in <span className="topic" style={{ backgroundColor: props.post.color }}>{props.post.topic}</span>:</p>
                <textarea name="text" className="post-text" defaultValue={props.post.text} />
                <div>
                    <input className="edit post-btn" type="button" value="Edit post" />
                    <input className="delete post-btn" type="button" value="Delete post" onClick={() => { deletePost(props.post.id) }} />
                </div>
            </div>

            {/* Part thats shown when post is not clicked */}
            <div style={{ display: clickedPost ? "none" : "block" }}>
                <div className="separator" style={{ backgroundColor: clickedPost ? "transparent" : props.post.color }} />
                <div className="aditional-info">
                    <p>{props.post.nickname}</p>
                    <p className="topic" style={{ backgroundColor: props.post.color }}>{props.post.topic}</p>
                </div>
            </div>



        </form>
    );
}

export default Post;