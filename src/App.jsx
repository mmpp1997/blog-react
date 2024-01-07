import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Login from './components/Login/Login';
import Blog from './components/Blog/Blog';

function App() {
  const [credentials, setCredentials] = useState({});

  useEffect(() => {
    console.log(credentials)
  }, [credentials]);

  function getCredentials(data) {
    setCredentials(data);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login login={getCredentials} />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;
