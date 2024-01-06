import axios from "axios";
import "../Post.css";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function BigPost(props) {

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
        <div className="big-post">
            <input name="title" type="text" className="post-title" value={props.post.title} disabled={true} required />
            <p className="about">User {props.post.nickname} asked in <span className="topic" style={{ backgroundColor: props.post.color }}>{props.post.topic}</span>:</p>
            <textarea id="text" name="text" className="post-text" defaultValue={props.post.text} disabled={true} required />
            <div className="btns">
                <div className="edit icon" onClick={props.clicked}><EditIcon style={{ fontSize: "35px" }} /></div>
                <div className="delete icon" onClick={() => { deletePost(props.post.id) }}><DeleteIcon style={{ fontSize: "35px" }} /></div>
                <div className="close icon" onClick={props.clicked}><CloseIcon style={{ fontSize: "35px" }} /></div>
            </div>
        </div>
    );
}
export default BigPost;
