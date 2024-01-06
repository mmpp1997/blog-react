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
  const [sort, setSort] = useState("All Posts");

  //update posts on reload
  useEffect(() => {

    const fetchPosts = async () => {
      try {
        const response = await axios.post('http://localhost:3001/posts', {topic:sort}, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [sort]);

  function toggleSideBar() {
    setSideBar((prev) => { return !prev });
  }

  function setFilter(value) {
    setSort(value);
  }


  return (
    <div className="grid-container">
      <div>
        <Header toggleBar={toggleSideBar} />
      </div>
      <div className="page-grid-test" style={{ gridTemplateColumns: sideBar ? "auto 250px" : "auto" }}>
        <div className="page">
          <NewPost />
          {posts.length === 0 && <p className="no-posts">There are no posts with this filter</p>}
          {posts.map((post) => {
            return (
              <Post key={post.id} post={post} />
            );
          })}
        </div>
        <div className="sidebar-div" style={{ display: sideBar ? "inline" : "none" }}>
          <Sidebar toggle={sideBar} filter={setFilter} sort={sort} close={toggleSideBar} />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Blog;