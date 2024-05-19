// import type { NextPage } from "next";
import React from "react";
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

import Leaderboard from "../../components/Leaderboard/Leaderboard";

// Images
import character from "../../assets/images/character.png";
import gem from "../../assets/images/gem.png";
import city from "../../assets/images/city.gif";

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

const Join = () => {
  return (
    <>
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
          {/* <GameRoomMember /> */}

          {/* <Leaderboard/> */}

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
            <Typography
              variant="h3"
              sx={{
                fontFamily: "VT323, sans-serif",
                color: "#E5E16D",
              }}
            >
              1st
            </Typography>
            <Image
              src={character}
              style={{
                width: "15%",
                height: "auto",
              }}
            />

            {/* Text Section */}
            <Box sx={{ paddingBottom: "32px" }}>
              <Box sx={{ display: "flex", gap: "16px", marginTop: "20px" }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "VT323, sans-serif",
                    color: "#fff",
                    textDecoration: "underline",
                  }}
                >
                  Precision:
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "VT323, sans-serif",
                    color: "#1EF467",
                  }}
                >
                  100%
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "16px", marginTop: "20px" }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "VT323, sans-serif",
                    color: "#fff",
                    textDecoration: "underline",
                  }}
                >
                  Correct:
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "VT323, sans-serif",
                    color: "#1EF467",
                  }}
                >
                  40/40
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: "16px", marginTop: "20px" }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "VT323, sans-serif",
                    color: "#fff",
                    textDecoration: "underline",
                  }}
                >
                  Clear time:
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "VT323, sans-serif",
                    color: "#fff",
                  }}
                >
                  650s
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: "16px", marginTop: "20px" }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "VT323, sans-serif",
                    color: "#fff",
                    textDecoration: "underline",
                  }}
                >
                  Rewarded gems:
                </Typography>
                <Box
                  sx={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: "VT323, sans-serif",
                      color: "#fff",
                    }}
                  >
                    15
                  </Typography>
                  <Image
                    src={gem}
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
    </>
  );
};

export default Join;
