import "./index.css";
import avatar from "../assets/Oval.svg";
import search from "../assets/search.svg";
import icon from "../assets/Movie.png";
import AppsIcon from "@mui/icons-material/Apps";
import TvIcon from "@mui/icons-material/Tv";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useRef, useState } from "react";

function Layout(props) {

  function handleChange(e) {
    props.setSearch(e.target.value)
  }
  return (
    <div className="layout">
      <div className="containers">
        {/* HEADER  */}
        <header className="header">
          <nav className="nav">
            <img width={32} height={26} src={icon} alt="icon" />
            <ul className="list-group">
              <li>
                <NavLink to="/">
                  <AppsIcon
                    width={20}
                  ></AppsIcon>
                </NavLink>
              </li>
              <li>
                <NavLink to="/movie">
                  <LocalMoviesIcon width={20}></LocalMoviesIcon>
                </NavLink>
              </li>
              <li>
                <NavLink to="series">
                  <TvIcon width={20}></TvIcon>
                </NavLink>
              </li>
              <li>
                <NavLink to="bookmarks">
                  <BookmarkIcon width={20}></BookmarkIcon>
                </NavLink>
              </li>
            </ul>
          </nav>
          <img width={40} height={40} src={avatar} alt="userpic" />
        </header>
        {/* BODY  */}
        <body className="body-section">
          <div className="search">
            <span className="searching">
              <img width={24} src={search} alt="search icon" />
              <input onChange={handleChange} type="text" placeholder="Search for movies or TV series" />
            </span>
          </div>
          <main className="main-section">
            <Outlet></Outlet>
          </main>
        </body>
      </div>
    </div>
  );
}

export default Layout;
