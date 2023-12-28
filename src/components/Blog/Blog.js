import "./Blog.css";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Post from "../Post/Post.js";

function Blog() {
  return (
    <div className="grid-container">
      <div>
        <Header />
      </div>
      <div className="page">
        <Post/>
        <Post/>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Blog;