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
import { CircularProgress, Divider, Grid, Typography } from "@mui/material";

import axios from "axios";

export default function RestPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    // ** GraphQL fetch data
    setLoading(true);

    const query = `
    query Person($personId: ID) {
        person(personID: $personId) {
          gender
          name
          height
          mass
          birthYear
          filmConnection {
            films {
              title
              planetConnection {
                planets {
                  name
                }
              }
            }
          }
        }
      }
  `;

    const URL = "https://swapi-graphql.netlify.app/.netlify/functions/index";
    axios
      .post(URL, {
        query,
        variables: { personId: "1" },
      })
      .then((res) => setData(res.data))
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
          <Grid item xs={7}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Box>
                    <Box>
                      <h3>Person</h3>
                      <div>
                        <Typography
                          sx={{ display: "inline", color: "#374278" }}
                        >
                          Gender:
                        </Typography>
                        <Typography sx={{ display: "inline" }} ml={1}>
                          {data?.data?.person?.gender}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          sx={{ display: "inline", color: "#374278" }}
                        >
                          Name:
                        </Typography>
                        <Typography sx={{ display: "inline" }} ml={1}>
                          {data?.data?.person?.name}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          sx={{ display: "inline", color: "#374278" }}
                        >
                          Height:
                        </Typography>
                        <Typography sx={{ display: "inline" }} ml={1}>
                          {data?.data?.person?.height}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          sx={{ display: "inline", color: "#374278" }}
                        >
                          Mass:
                        </Typography>
                        <Typography sx={{ display: "inline" }} ml={1}>
                          {data?.data?.person?.mass}
                        </Typography>
                      </div>
                      <div>
                        <Typography
                          sx={{ display: "inline", color: "#374278" }}
                        >
                          Birth Year:
                        </Typography>
                        <Typography sx={{ display: "inline" }} ml={1}>
                          {data?.data?.person?.birthYear}
                        </Typography>
                      </div>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box>
                      <h3>Movie</h3>
                      <Typography sx={{ display: "inline", color: "#374278" }}>
                        Title:
                      </Typography>
                      <Typography sx={{ display: "inline" }} ml={1}>
                        {data?.data?.person?.filmConnection?.films[1]?.title}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box>
                      <h3>Planet</h3>
                      <Typography sx={{ display: "inline", color: "#374278" }}>
                        Name:
                      </Typography>
                      <Typography sx={{ display: "inline" }} ml={1}>
                        {
                          data?.data?.person?.filmConnection?.films[1]
                            ?.planetConnection?.planets[1]?.name
                        }
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
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
              <Typography color="white">/graphql</Typography>
              {loading ? <CircularProgress /> : <JSONPretty data={data} />}
            </Box>
          </Grid>
        </Grid>
      </main>
    </>
  );
}
