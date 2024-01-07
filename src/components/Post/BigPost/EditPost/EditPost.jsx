import axios from "axios";
import "../../Post.css";
import { useState, useEffect } from "react";
import {topics} from "../../../../topics";

function EditPost(props) {

    const [editedPost, setEditedPost] = useState({});

    useEffect(() => {
        if (Object.keys(editedPost).length > 0) {
            const editPost = async () => {
                try {

                    await axios.post('http://localhost:3001/edit', editedPost, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                } catch (error) {
                    console.log(error);
                }
            };
            editPost();
            props.toggle();
        }
    }, [editedPost, props])


    async function handleEdit(event) {
        event.preventDefault();
        const topic = topics.find((topic) => topic.name === event.target.topic.value);
        const editedPost = {
            id: props.post.id,
            title: event.target.title.value,
            text: event.target.text.value,
            topic: topic.name,
            color: topic.color,
        };
        setEditedPost(editedPost);
    }


    return (
        <form className="big-post" onSubmit={handleEdit}>
            <p className="edit-label">Enter new title:</p>
            <input name="title" type="text" className="post-title" defaultValue={props.post.title} required />
            <div className="edit-topic">
            <p className="edit-label">Select new topic:</p>
            <select name="topic" className="edit-select" title="Topic of the post">
                {topics.map((topic) => {
                    return (
                        <option key={topic.name}>{topic.name}</option>
                    );
                })}
            </select>
            </div>
            <p className="edit-label">Enter new text:</p>
            <textarea name="text" className="post-text" defaultValue={props.post.text} required />
            <div className="btns">
                <input className="edit post-btn" type="submit" value="Confirm edit" />
                <input className="delete post-btn" type="button" value="Cancel" onClick={() => { props.toggle() }} />
            </div>
        </form>
    );
}
export default EditPost;
