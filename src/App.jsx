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
function ProtectedRoute({children, redirectTo='/login', isAuthenticated}){
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate(redirectTo);
  }

  return children
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [search, setSearch] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setToken(null);// Redirect to login if no token found
    } else {
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      <Routes>
        {/* Signup va Login yo'lovchilari token bo'yicha boshqa shartlar bilan ko'rsatilgan */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Asosiy sahifa uchun Layout komponenti bilan birga ko'rsatilgan yo'lovchilar */}
        <Route path="/" element={<Layout setSearch={setSearch} />}>
          <Route index element={
            <ProtectedRoute isAuthenticated={token?true:false}>
              <Home search={search} />
            </ProtectedRoute>
          } />
          <Route path="movie" element={
            <ProtectedRoute isAuthenticated={token?true:false}>
            <Movie search={search} />
          </ProtectedRoute>
          } />
          <Route path="series" element={
            <ProtectedRoute isAuthenticated={token?true:false}>
              <Series search={search} />
            </ProtectedRoute>
          } />
          <Route path="bookmarks" element={
            <ProtectedRoute isAuthenticated={token?true:false}>
              <Bookmarks search={search} />
            </ProtectedRoute>
          } />
        </Route>

        {/* About sahifasi */}
        <Route path="/about" element={
          <ProtectedRoute isAuthenticated={token?true:false}>
            <About search={search} />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
