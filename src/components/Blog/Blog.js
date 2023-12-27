import "./Blog.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Post from "../Post/Post";

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