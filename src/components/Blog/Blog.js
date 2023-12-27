import "./Blog.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Blog() {
  return (
    <div className="grid-container">
      <div>
        <Header />
      </div>
      <div>
        <h1>Future body</h1>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Blog;