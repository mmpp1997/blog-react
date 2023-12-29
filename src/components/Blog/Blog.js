import "./Blog.css";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Post from "../Post/Post.js";
import { useEffect, useState } from "react";
import axios from "axios";

function Blog() {
  const [posts, setPosts] = useState([]);

  //update posts on reload
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/posts');
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  //show updated posts
  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <div className="grid-container">
      <div>
        <Header />
      </div>
      <div className="page">
        <Post />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Blog;