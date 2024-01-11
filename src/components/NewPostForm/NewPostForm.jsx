import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import {change} from "../../store/store";

import "./NewPostForm.css";
import {topics} from "../../topics"
import { server } from "../../App";

function NewPostForm(props) {

    const dispatch = useDispatch();
    const [newPost, setNewPost] = useState({});
    const currentUser = useSelector(state => state.currentUser);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (Object.keys(newPost).length > 0) {
            const addPost = async () => {
                try {
                    await axios.post(server+"/add", newPost, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    dispatch(change());
                } catch (error) {
                    console.log(error);
                }
            };
            addPost();
            props.clicked();
        }
    }, [newPost, props, dispatch,token])

    function createNewPost(event) {

        event.preventDefault();

        const topic = topics.find((topic) => topic.name === event.target.topic.value);

        const post = {
            title: event.target.title.value,
            topic: event.target.topic.value,
            color: topic.color,
            userid: currentUser.id,
            text: event.target.text.value,

        }
        setNewPost(post);
    }
    return (
        <form name="newPost" className="new-post-space" onSubmit={createNewPost}>
            <input name="title" type="text" className="new-post-title" placeholder="Enter new post title" required/>
            <div className="new-post-separator" />
            <textarea name="text" className="new-post-text" placeholder="Enter new post text" required/>
            <div className="new-post-separator" />
            <div className="new-post-btns">
                <select name="topic" className="new-post-topics" title="Topic of the post">
                    {topics.map((topic) => {
                        return (
                            <option key={topic.name}>{topic.name}</option>
                        );
                    })}
                </select>
                <input className="add-new new-btn" type="submit" value="Add post" />
                <input className="cancel-new new-btn" type="button" value="Cancel" onClick={() => { props.clicked(false) }} />
            </div>
        </form>
    );
}
export default NewPostForm;


