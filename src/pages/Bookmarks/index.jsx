// Bookmarks.jsx
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import React, { useState, useEffect } from "react";
import All from "../Cards/All";
import Alert from "@mui/material/Alert";
import "./index.css";
import useFetch from "../../hooks/useFetch";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

 function AlertDialogSlide() {
  const [open, setOpen] = React.useState(true);



  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle  sx={{color: 'black', fontSize: '24px', fontWeight: '500', textShadow: '0 0 2px black'}}>{"We apologize for the server issue"}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{color: 'red', fontSize: '18px', width: '90%'}} id="alert-dialog-slide-description">
          The search engine bookmarks section is temporarily down due to a server problem
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANSEL</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

function Bookmarks(props) {
  const [movie, setMovie] = useState([]);
  const [series, setSeries] = useState([]);
  const [key, setKey] = useState('');
  

  useEffect(() => {
    const save = localStorage.getItem("save");
    if (save) {
      const savedItems = JSON.parse(save);
      const movieItems = savedItems.filter((item) => item.type === "movie");
      const seriesItems = savedItems.filter((item) => item.type === "tv-series");
      setMovie(movieItems);
      setSeries(seriesItems);
    }
  }, []);

  const searchMovie = useFetch(
    `${import.meta.env.VITE_API}/v1.4/movie/search?page=1&limit=10&query=movie%${key}`
  );
  const searchTV = useFetch(
    `${import.meta.env.VITE_API}/v1.4/movie/search?page=1&limit=10&query=tv-series%${key}`
  );

  function onChanges(id) {
    const savedItems = JSON.parse(localStorage.getItem("save"));
    const updatedMovie = savedItems.filter(
      (item) => item.type === "movie" && item.id !== id
    );
    const updatedSeries = savedItems.filter(
      (item) => item.type === "tv-series" && item.id !== id
    );
    setMovie(updatedMovie);
    setSeries(updatedSeries);
  }

  return (
    <div>
      <div>
        <h2 className="trading">Movie</h2>
        <div className="cards-wrapper">
         {
           props.search ? (
            !searchTV.data && searchTV.data.docs.length > 0 ? (
              searchTV.data.docs.map((card, index) => (
                <All key={index} docs={card} />
              ))
            ) : (
              <>
                <Alert variant="filled" severity="warning">
                  Unfortunately, nothing was found.
                </Alert>
              <AlertDialogSlide />
              </>
            )
          ) :
          (movie.length > 0 ? (
            movie.map((card, index) => (
              <All key={index} docs={card} onChanges={onChanges} />
            ))
          ) : (
            <Alert variant="filled" severity="info">
              Unfortunately, no movie bookmarks found.
            </Alert>
          ))
          }
        </div>
      </div>
      <br /><br /><br />
      <hr />
      <div>
        <h2 className="trading2">TV Series</h2>
        <div className="cards-wrapper">
          {
             props.search ? (
              !searchMovie.data && searchMovie.data.docs.length > 0 ? (
                searchMovie.data.docs.map((card, index) => (
                  <All key={index} docs={card} />
                ))
              ) : (
                <Alert variant="filled" severity="warning">
                  Unfortunately, nothing was found.
                </Alert>
              )
            ) :
          (series.length > 0 ? (
            series.map((card, index) => (
              <All key={index} docs={card} onChanges={onChanges} />
            ))
          ) : (
            <Alert variant="filled" severity="info">
              Unfortunately, no TV series bookmarks found.
            </Alert>
          ))
          }
        </div>
      </div>
    </div>
  );
}

export default Bookmarks;
