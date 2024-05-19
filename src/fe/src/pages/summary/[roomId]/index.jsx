// import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Avatar,
  LinearProgress,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";
import PropTypes from "prop-types";
import Spritesheet from "react-responsive-spritesheet";

// Images
import character from "../../../assets/images/character.png";
import gemImage from "../../../assets/images/gem.png";
import city from "../../../assets/images/city.gif";
import axios from "axios";
import { useRouter } from "next/router";

import { SEO } from "../../../components/SEO";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 2 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            height: "24px",
            borderRadius: "10px",
            backgroundColor: "transparent",
            border: "1px solid #E4E4E4",
            "& > span": {
              backgroundColor: "#FF2626",
            },
          }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body1" color="#fff">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const Summary = () => {
  const router = useRouter();
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URI + "/game/summary",
        {
          uid: localStorage.getItem("uid"),
          data: router.query.roomId,
        }
      );
      setResult(res.data.data);
    }

    fetchData();
  }, []);

  return (
    <>
      <SEO
        url={`${"https://UETegame.games"}/summary/${router.query.roomId}`}
        openGraphType="website"
        schemaType="article"
        title={`Summary - ${router.query.roomId}`}
        description={"Take a look of your performance in the game"}
        image={
          "https://images.unsplash.com/photo-1656312193617-b8d43d0b9535?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80"
        }
      />
      {result != null && (
        <Box
          component="section"
          sx={(theme) => ({
            height: "100vh",
          })}
        >
          <Box
            sx={{
              height: "100%",
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.40)), url(${city.src})`,
              backgroundSize: "contain",
              display: "flex",
              flexDirection: "column",
              // justifyContent: 'center',
              alignItems: "center",
              paddingBottom: "4%",
            }}
          >
            <Box
              sx={{
                width: "35%",
                height: "fit-content",
                backgroundColor: "rgba(36, 36, 36, 0.70)",
                borderRadius: "5px",
                marginTop: "4%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "VT323, sans-serif",
                  color: "#fff",
                  paddingTop: "32px",
                }}
              >
                Summary
              </Typography>
              {/* <Typography
              variant="h3"
              sx={{
                fontFamily: "VT323, sans-serif",
                color: "#E5E16D",
              }}
            >
              1st
            </Typography> */}
              <Box sx={{ width: 150, height: 150 }}>
                <Spritesheet
                  image={`/assets/game/images/knight.png`}
                  widthFrame={24}
                  heightFrame={24}
                  fps={6}
                  startAt={0}
                  endAt={4}
                  style={{
                    imageRendering: "pixelated",
                    transform: `scale(1})`,
                  }}
                  loop
                />
              </Box>

              {/* Text Section */}
              <Box sx={{ paddingBottom: "32px" }}>
                <Box sx={{ display: "flex", gap: "16px", marginTop: "20px" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "VT323, sans-serif",
                      color: "#fff",
                    }}
                  >
                    Precision:
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "VT323, sans-serif",
                      color: "#1EF467",
                    }}
                  >
                    {Math.floor((result.corCnt / result.totalQues) * 100)}%
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "16px", marginTop: "20px" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "VT323, sans-serif",
                      color: "#fff",
                    }}
                  >
                    Correct:
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "VT323, sans-serif",
                      color: "#1EF467",
                    }}
                  >
                    {result.corCnt}/{result.totalQues}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: "16px", marginTop: "20px" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "VT323, sans-serif",
                      color: "#fff",
                    }}
                  >
                    Clear time:
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "VT323, sans-serif",
                      color: "#fff",
                    }}
                  >
                    {Math.floor(result.totalTime / 1000)}s
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: "16px", marginTop: "20px" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "VT323, sans-serif",
                      color: "#fff",
                    }}
                  >
                    Rewarded gems:
                  </Typography>
                  <Box
                    sx={{ display: "flex", gap: "12px", alignItems: "center" }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "VT323, sans-serif",
                        color: "#fff",
                      }}
                    >
                      {result.gems}
                    </Typography>
                    <Image
                      src={gemImage}
                      style={{
                        width: "32px",
                        height: "32px",
                      }}
                    />
                  </Box>
                </Box>
              </Box>

              <Button
                component="a"
                href="/dashboard"
                variant="outlined"
                sx={{
                  borderColor: "#BDCADB",
                  borderRadius: "0px",
                  fontFamily: "VT323, sans-serif",
                  color: "#BDCADB",
                  fontSize: "24px",
                  textTransform: "unset",
                  border: "2px solid",
                  padding: "8px 20px",
                  marginBottom: "32px",
                  "&:hover": {
                    border: "2px solid #BDCADB",
                  },
                }}
              >
                Back to Dashboard
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Summary;
