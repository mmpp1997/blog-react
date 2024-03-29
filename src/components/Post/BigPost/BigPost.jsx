import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { change,changeAlert } from "../../../store/store";

import EditPost from "./EditPost/EditPost";
import "../Post.css";
import { server } from "../../../App";

function BigPost(props) {

    const dispatch = useDispatch();
    const [editToggle, setEditToggle] = useState(false);
    const currentUser = useSelector(state => state.currentUser);
    const token = localStorage.getItem('token');

    //delete post function
    async function deletePost(id, userid) {
        try {
            await axios.post(server+"/delete", { id: id, userid: userid}, {
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

    function handleEditClick() {
        setEditToggle((prev) => { return !prev });

    }

    return (
        <div>
            {editToggle ? <EditPost post={props.post} toggle={handleEditClick} /> :
                <div className="big-post">
                    <p className="post-title">{props.post.title}</p>
                    <p className="about">User {props.post.nickname} asked in <span className="topic" style={{ backgroundColor: props.post.color }}>{props.post.topic}</span>:</p>
                    <p className="post-text">{props.post.text}</p>
                    <div className="btns">
                        {currentUser.id === props.post.userid &&
                            <div className="hidden-btns">
                                <div className="edit icon" onClick={() => { handleEditClick(props.post.id) }}><EditIcon style={{ fontSize: "35px" }} /></div>
                                <div className="delete icon" onClick={() => { deletePost(props.post.id,props.post.userid) }}><DeleteIcon style={{ fontSize: "35px" }} /></div>
                            </div>
                        }
                        <div className="close icon" onClick={props.clicked}><CloseIcon style={{ fontSize: "35px" }} /></div>
                    </div>
                </div>
            }
        </div>

    );
}
export default BigPost;
