// import type { NextPage } from "next";
import React from "react";
import { Typography, Box, Button, Avatar } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import Image from "next/image";

// Images
import cat from "../../assets/images/cat.jpg";
import city from "../../assets/images/city.gif";
import image1 from "../../assets/images/bg.jpg";

const Join = ({ onStart, data, role, leaveGame, rid, roomData }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          paddingTop: "4%",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "#fff",
            fontFamily: "VT323, monospace",
            lineHeight: "normal",
          }}
        >
          Game: {roomData.name}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Code: {rid}
        </Typography>
      </Box>

      <Grid
        container
        sx={{
          gap: "128px",
          paddingTop: "48px",
        }}
      >
        {data.map((item, key) => {
          return (
            <Grid
              xs={4}
              sx={{
                display: "flex",
                width: "fit-content",
                gap: "16px",
                alignItems: "center",
              }}
              key={key}
            >
              <Image
                alt="ava"
                src={image1}
                width={120}
                height={120}
                style={{
                  width: "64px",
                  height: "auto",
                  aspectRatio: "1/1",
                  borderRadius: "100px",
                  border: `2px solid #FFF`,
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: "#fff",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                {item.user.uname}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
      {role == "Admin" ? (
        <Button
          variant="contained"
          onClick={onStart}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "5px",
            padding: "12px 24px",
            boxShadow:
              "0px 1px 2px 0px rgba(0, 0, 0, 0.24), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
            color: "#000",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            marginTop: "32px",
          }}
        >
          Start Game
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={leaveGame}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "5px",
            padding: "12px 24px",
            boxShadow:
              "0px 1px 2px 0px rgba(0, 0, 0, 0.24), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
            color: "#000",
            fontFamily: "Poppins, sans-serif",
            fontWeight: "bold",
            marginTop: "32px",
          }}
        >
          Leave Game
        </Button>
      )}
    </>
  );
};

export default Join;
