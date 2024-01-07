import axios from "axios";
import "../Post.css";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import EditPost from "./EditPost/EditPost";

function BigPost(props) {

    const [editToggle, setEditToggle] = useState(false);

    //delete post function
    async function deletePost(id) {
        try {
            await axios.post('http://localhost:3001/delete', { id: id }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.log(error);
        }
    };
    
    function handleEditClick() {
        setEditToggle((prev)=>{return !prev});

    }

    return (
        <div>
            {editToggle ? <EditPost post={props.post} toggle={handleEditClick}/> :
                <div className="big-post">
                    <p className="post-title">{props.post.title}</p>
                    <p className="about">User {props.post.nickname} asked in <span className="topic" style={{ backgroundColor: props.post.color }}>{props.post.topic}</span>:</p>
                    <p className="post-text">{props.post.text}</p>
                    <div className="btns">
                        <div className="edit icon" onClick={() => { handleEditClick(props.post.id) }}><EditIcon style={{ fontSize: "35px" }} /></div>
                        <div className="delete icon" onClick={() => { deletePost(props.post.id) }}><DeleteIcon style={{ fontSize: "35px" }} /></div>
                        <div className="close icon" onClick={props.clicked}><CloseIcon style={{ fontSize: "35px" }} /></div>
                    </div>
                </div>
            }
        </div>

    );
}
export default BigPost;
