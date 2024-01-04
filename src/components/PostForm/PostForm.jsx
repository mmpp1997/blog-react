import "./PostForm.css";

function PostForm(props) {
    return (
        <div className="post-space">
            <input type="text" className="" placeholder="Enter new post title"/>
            <div className="">
                <p>User  asked in (theme)</p>
                <textarea className="post-text" placeholder="Enter new post text"/>
                <div>
                    <input className="" type="button" value="add post" />
                    <input className="" type="button" value="cancel" onClick={()=>{props.clicked(false)}}/>
                </div>
            </div>
        </div>
    );
}
export default PostForm;


