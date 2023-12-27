import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login.js';
import Blog from './components/Blog/Blog.js';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" exact element={<Login/>} />
          <Route path="/blog" element={<Blog/>} />
        </Routes>
    </Router>
  );
}

export default App;
