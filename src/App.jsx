import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./loyaut/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Series from "./pages/Series";
import Bookmarks from "./pages/Bookmarks";
import About from "./pages/About";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      navigate('/login'); // Redirect to login if no token found
    } else {
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      <Routes>
        {!token && <Route path="/signup" element={<Signup />} />}
        {!token && <Route path="/login" element={<Login />} />}
        <Route path="/" element={<Layout setSearch={setSearch} />}>
          <Route index element={<Home search={search} />} />
          <Route path="movie" element={<Movie search={search} />} />
          <Route path="series" element={<Series search={search} />} />
          <Route path="bookmarks" element={<Bookmarks search={search} />} />
        </Route>
        <Route path="about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
