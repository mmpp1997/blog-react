import { useEffect, useState } from "react";
import axios from "axios";

import "./Blog.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Post from "../Post/Post";
import NewPost from "../NewPost/NewPost";
import Sidebar from "../SideBar/SideBar";


function Blog() {
  const [posts, setPosts] = useState([]);
  const [sideBar, setSideBar] = useState(false);

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

  function toggleSideBar() {
    setSideBar((prev) => { return !prev });
  }


  return (
    <div className="grid-container">
      <div>
        <Header toggleBar={toggleSideBar} />
      </div>
      <div className="page-grid-test" style={{ gridTemplateColumns: sideBar ? "auto 250px" : "auto" }}>
        <div className="page">
          <NewPost />
          {posts.map((post) => {
            return (
              <Post key={post.id} post={post} />
            );
          })}
        </div>
        <div className="sidebar-div" style={{ display: sideBar ? "inline" : "none" }}>
          <Sidebar toggle={sideBar} />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Blog;