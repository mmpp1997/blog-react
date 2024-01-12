import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {change,changeAlert} from "../../../../store/store";
import "../../Post.css";
import {topics} from "../../../../topics";
import { server } from "../../../../App";

function EditPost(props) {

    const dispatch = useDispatch();
    const [editedPost, setEditedPost] = useState({});
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (Object.keys(editedPost).length > 0) {
            const editPost = async () => {
                try {

                    await axios.post(server+"/edit", editedPost, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    dispatch(changeAlert(true));
                    dispatch(change());

                } catch (error) {
                    console.log(error);
                }
            };
            editPost();
            props.toggle();
        }
    }, [editedPost, props, dispatch, token])


    async function handleEdit(event) {
        event.preventDefault();
        const topic = topics.find((topic) => topic.name === event.target.topic.value);
        const editedPost = {
            id: props.post.id,
            title: event.target.title.value,
            text: event.target.text.value,
            topic: topic.name,
            color: topic.color,
            userid: props.post.userid
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
