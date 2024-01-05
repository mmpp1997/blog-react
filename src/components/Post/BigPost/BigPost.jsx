import "../Post.css";

function BigPost(props) {
    return (
        <div className="big-post">
            <input name="title" type="text" className="post-title" value={props.post.title} disabled={true} required />
            <p>User {props.post.nickname} asked in <span className="topic" style={{ backgroundColor: props.post.color }}>{props.post.topic}</span>:</p>
            <textarea name="text" className="post-text" defaultValue={props.post.text} disabled={true} required />
            <div className="btns">
                <input className="edit post-btn" type="button" value="Edit post" />
                <input className="delete post-btn" type="button" value="Delete post"/>
                <input className="delete post-btn" type="button" value="X"/>
            </div>
        </div>
    );
}
export default BigPost;
