import { useEffect, useState } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
const inter = Inter({ subsets: ["latin"] });
import styles from "@/styles/Home.module.css";
import "react-json-pretty/themes/monikai.css";
import JSONPretty from "react-json-pretty";

// ** MUI Imports
import { Box } from "@mui/system";
import CircleIcon from "@mui/icons-material/Circle";
import { CircularProgress, Grid, Typography } from "@mui/material";

import axios from "axios";

export default function RestPage() {
  const [loading, setLoading] = useState(false);
  const [people, setPeople] = useState({});
  const [films, setFilms] = useState({});
  const [planets, setPlanets] = useState({});

  useEffect(() => {
    // ** RESTful API fetch data
    setLoading(true);

    const URL = "https://swapi.dev/api/" + "people/1";

    axios
      .get(URL)
      .then((res) => {
        setPeople(res.data);

        axios.get(res.data.films[1]).then((res) => {
          setFilms(res.data);

          axios.get(res.data.planets[1]).then((res) => {
            setPlanets(res.data);
          });
        });
      })
      .then(() => setLoading(false));
  }, []);

  return (
    <>
      <Head>
        <title>SWAPI GraphQL</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <Box
              sx={{
                p: 2,
                pt: 1,
                bgcolor: "#272822",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ ml: "auto" }}>
                <CircleIcon sx={{ fontSize: "0.7rem" }} color="success" />
                <CircleIcon sx={{ fontSize: "0.7rem" }} color="info" />
                <CircleIcon sx={{ fontSize: "0.7rem" }} color="error" />
              </Box>
              <Typography color="white">/people/1</Typography>
              {loading ? <CircularProgress /> : <JSONPretty data={people} />}
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                p: 2,
                pt: 1,
                bgcolor: "#272822",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ ml: "auto" }}>
                <CircleIcon sx={{ fontSize: "0.7rem" }} color="success" />
                <CircleIcon sx={{ fontSize: "0.7rem" }} color="info" />
                <CircleIcon sx={{ fontSize: "0.7rem" }} color="error" />
              </Box>
              <Typography color="white">/films/1</Typography>
              {loading ? <CircularProgress /> : <JSONPretty data={films} />}
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                p: 2,
                pt: 1,
                bgcolor: "#272822",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ ml: "auto" }}>
                <CircleIcon sx={{ fontSize: "0.7rem" }} color="success" />
                <CircleIcon sx={{ fontSize: "0.7rem" }} color="info" />
                <CircleIcon sx={{ fontSize: "0.7rem" }} color="error" />
              </Box>
              <Typography color="white">/planets/1</Typography>
              {loading ? <CircularProgress /> : <JSONPretty data={planets} />}
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Box>
                    <Box>Movie: {films.title}</Box>
                    <Box>Planet: {planets.name}</Box>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </>
  );
}
