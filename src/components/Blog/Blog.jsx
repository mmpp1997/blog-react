import "./Blog.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Post from "../Post/Post";
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


  return (
    <div className="grid-container">
      <div>
        <Header />
      </div>
      <div className="page">
        {posts.map((post) => {
          return (
            <Post key={post.id} post={post} />
          );
        })}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Blog;