import axios from "axios";
import { useState, useEffect } from "react";
import "./Post.css";
import SmallPost from "./SmallPost/SmallPost";
import BigPost from "./BigPost/BigPost";

function Post(props) {
    const [clickedPost, setClickedPost] = useState(false);
    useEffect(() => { console.log(clickedPost) }, [clickedPost]);

    function postClicked() {
        console.log("clciked");
        setClickedPost((prev) => {
            return (!prev);
        })
    };

    //delete post function
    async function deletePost(id) {
        try {
            await axios.post('http://localhost:3001/delete', { id: id }, {
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
        <div className="post">
        {!clickedPost ? <SmallPost post={props.post}/>:<BigPost post={props.post} />}
        <input type="button" value="click" onClick={postClicked}/>
        </div>
    );
}

export default Post;