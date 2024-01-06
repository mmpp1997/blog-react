import "../Post.css";

function SmallPost(props) {
    return (
        <div className="small" onClick={props.clicked}>
            <input name="title" type="text" className="post-title" value={props.post.title} disabled={true} required />
            <div className="separator" style={{ backgroundColor: props.post.color }} />
            <div className="aditional-info">
                <p>{props.post.nickname}</p>
                <p className="topic" style={{ backgroundColor: props.post.color }}>{props.post.topic}</p>
            </div>
        </div>
    );
}
export default SmallPost;
