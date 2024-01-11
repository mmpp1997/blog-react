import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Blog from './components/Blog/Blog';

const server="http://localhost:3001";
export {server};

function App() {

  
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login/>} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;
