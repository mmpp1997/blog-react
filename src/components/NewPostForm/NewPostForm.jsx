import { useState, useEffect } from "react";
import axios from "axios";
import "./NewPostForm.css";
import {topics} from "../../topics"

function NewPostForm(props) {
    const [newPost, setNewPost] = useState({});

    useEffect(() => {
        if (Object.keys(newPost).length > 0) {
            const addPost = async () => {
                try {
                    await axios.post('http://localhost:3001/add', newPost, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                } catch (error) {
                    console.log(error);
                }
            };
            addPost();
            props.clicked();
        }
    }, [newPost, props])

    function createNewPost(event) {

        event.preventDefault();

        const topic = topics.find((topic) => topic.name === event.target.topic.value);

        const post = {
            title: event.target.title.value,
            topic: event.target.topic.value,
            color: topic.color,
            userid: 1,
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


