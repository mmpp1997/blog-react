import "./Post.css";

function Post(props) {

    function postClicked(id){
        console.log("clicked post "+id);
    }

    return (
        <div className="post" onClick={()=>{postClicked(props.post.id)}}>
            <p className="post-title">{props.post.title}</p>
            <div className="separator" style={{backgroundColor: props.post.color}}/>
            <div className="aditional-info">
                <p>{props.post.nickname}</p>
                <p>{props.post.topic}</p>
            </div>
        </div>
    );
}

export default Post;