import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from 'react-redux';
import { change, setCurrentUser } from "../../store/store";
import Alert from '@mui/material/Alert';

import "./Blog.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Post from "../Post/Post";
import NewPost from "../NewPost/NewPost";
import Sidebar from "../SideBar/SideBar";
import { server } from "../../App";


function Blog() {

  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [sideBar, setSideBar] = useState(false);
  const [sort, setSort] = useState("All Posts");
  const [alert, setAlert] = useState(false);

  const updateToggle = useSelector(state => state.toggle);
  const toggleAlert = useSelector(state => state.toggleAlert);


  var token = localStorage.getItem('token');
  const tokenCookie = Cookies.get('token');
  if (!token && tokenCookie) {
    localStorage.setItem('token', tokenCookie);
    token = tokenCookie;
  }

  //set alert
  useEffect(() => {
    if (toggleAlert) {
      setAlert(true);

      const timeoutId = setTimeout(() => {
        setAlert(false);
      }, 1000);
      //dispatch(changeAlert(false));
      return () => clearTimeout(timeoutId);
    }
  }, [toggleAlert]);

  //update posts on reload
  useEffect(() => {

    const fetchPosts = async () => {

      try {

        const response = await axios.post(server + "/posts", { topic: sort }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const user = response.data.user;
        dispatch(setCurrentUser(user));
        setPosts(response.data.data);

      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();

  }, [sort, updateToggle, token, dispatch]);

  function toggleSideBar() {
    setSideBar((prev) => { return !prev });
  }

  function setFilter(value) {
    setSort(value);
    dispatch(change());
  }


  return (
    <div className="grid-container">
      <div>
        <Header toggleBar={toggleSideBar} />
      </div>
      <div className="page-grid-test" style={{ gridTemplateColumns: sideBar ? "auto 250px" : "auto" }}>
        <div className="page">
          <NewPost />
          {alert && <Alert variant="filled" severity="success">Done</Alert>}
          {posts.length === 0 && <p className="no-posts">There are no posts with this filter</p>}
          {posts.map((post) => {
            return (
              <Post key={post.id} post={post} />
            );
          })}
        </div>
        <div className="sidebar-div" style={{ display: sideBar ? "inline" : "none" }}>
          {sideBar && <Sidebar filter={setFilter} sort={sort} close={toggleSideBar} />}

        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Blog;