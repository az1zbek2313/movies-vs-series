import All from "../Cards/All";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from '@mui/material/Alert';
import "./index.css";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";

function Series(props) {
  const [key, setKey] = useState();

  const all = useFetch(
    `${import.meta.env.VITE_API}/v1.4/movie?page=1&limit=200&type=tv-series`
  );
  const search = useFetch(
    `${import.meta.env.VITE_API}/v1.4/movie/search?page=1&limit=10&query=tv-series%${key}`
  );

  useEffect(() => {
    setKey(props.search);
  }, [props.search]);

  return (
    <div>
      <h2 className="trading">TV Series</h2>
      {
        all.loading ? (
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="secondary" />
            <LinearProgress color="success" />
            <LinearProgress color="inherit" />
          </Stack>
        ) :
        <div className="cards-wrapper">
        {props.search ? (
          search.data && search.data.docs.length > 0 ? (
            search.data.docs.map((card, index) => (
              <All key={index} docs={card} />
            ))
          ) : (
            <Alert variant="filled" severity="warning">
              Unfortunately, nothing was found.
            </Alert>
          )
        ) : (
          all.data &&
          (all.loading ? (
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <LinearProgress color="secondary" />
              <LinearProgress color="success" />
              <LinearProgress color="inherit" />
            </Stack>
          ) : (
            all.data.docs.map((card, index) => {
              return (
                all.data &&
                (all.loading ? (
                  <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                    <LinearProgress color="secondary" />
                    <LinearProgress color="success" />
                    <LinearProgress color="inherit" />
                  </Stack>
                ) : (
                  <All key={index} docs={card} />
                ))
              );
            })
          ))
        )}
      </div>
      }

    </div>
  );
}

export default Series;
