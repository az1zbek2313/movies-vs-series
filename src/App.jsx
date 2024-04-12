import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./loyaut/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Series from "./pages/Series";
import Bookmarks from "./pages/Bookmarks";
import About from "./pages/About";

function ProtectedRoute({ children, redirectTo = '/login', isAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, redirectTo]);

  return isAuthenticated ? children : null;
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [search, setSearch] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setToken(false);// Redirect to login if no token found
    } else {
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Layout setSearch={setSearch} />}>
          <Route
            path="/"
            element={
              <ProtectedRoute redirectTo="/login" isAuthenticated={token ? true : false}>
                <Home search={search} />
              </ProtectedRoute>
            }
          />
          <Route
            path="movie"
            element={
              <ProtectedRoute redirectTo="/login" isAuthenticated={token ? true : false}>
                <Movie search={search} />
              </ProtectedRoute>
            }
          />
          <Route
            path="series"
            element={
              <ProtectedRoute redirectTo="/login" isAuthenticated={token ? true : false}>
                <Series search={search} />
              </ProtectedRoute>
            }
          />
          <Route
            path="bookmarks"
            element={
              <ProtectedRoute redirectTo="/login" isAuthenticated={token ? true : false}>
                <Bookmarks search={search} />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="/about"
          element={
            <ProtectedRoute redirectTo="/login" isAuthenticated={token ? true : false}>
              <About search={search} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
