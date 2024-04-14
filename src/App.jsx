import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import Layout from "./loyaut/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Series from "./pages/Series";
import Bookmarks from "./pages/Bookmarks";
import About from "./pages/About";

function ProtectedRoute({ children, redirectTo = '/login', isAuthenticated, ...rest }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && rest.path !== '/login') {
      navigate(redirectTo);
    }
    
  }, [isAuthenticated, navigate, redirectTo, rest.path]);

  return children;
}


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [search, setSearch] = useState('');

  useEffect(() => {

    if (token) {
      setToken(localStorage.getItem('token'))
    } else {
      setToken(false);
    }

  }, []);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setToken={setToken}/>} />

        <Route element={<Layout setSearch={setSearch} />}>
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={token ? true : false}>
                <Home search={search} />
              </ProtectedRoute>
            }
          />
          <Route
            path="movie"
            element={
              <ProtectedRoute isAuthenticated={token ? true : false}>
                <Movie search={search} />
              </ProtectedRoute>
            }
          />
          <Route
            path="series"
            element={
              <ProtectedRoute isAuthenticated={token ? true : false}>
                <Series search={search} />
              </ProtectedRoute>
            }
          />
          <Route
            path="bookmarks"
            element={
              <ProtectedRoute isAuthenticated={token ? true : false}>
                <Bookmarks search={search} />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/about"
          element={
            <ProtectedRoute isAuthenticated={token ? true : false}>
              <About search={search} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
