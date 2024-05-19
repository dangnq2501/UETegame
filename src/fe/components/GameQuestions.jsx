import React, { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import NodeContent from "./NodeContent";

const GameQuestions = ({ data, handleOnClick, correct, answer, message }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        padding: "2%",
        width: "912px",
      }}
    >
      <NodeContent
        sx={{ fontSize: "16px", color: "white" }}
        node={data.content}
      />
      {answer ? (
        <Typography
          variant="body1"
          sx={{
            fontFamily: "VT323, sans-serif",
            color: "rgba(255, 255, 255, 0.60)",
            fontSize: "30px",
          }}
        >
          {message}
        </Typography>
      ) : null}
      <Grid
        container
        sx={{
          padding: "2% 2%",
          display: answer ? "none" : "flex",
        }}
      >
        <Grid xs={6} sx={{ padding: "0 32px" }}>
          <Button
            onClick={() => handleOnClick(0)}
            variant="outlined"
            value={0}
            sx={{
              transition: "0.5s",
              fontFamily: "VT323, sans-serif",
              color: "rgba(255, 255, 255, 0.60)",
              fontSize: "20px",
              borderColor: "rgba(255, 255, 255, 0.60)",
              margin: "8px",
              width: "100%",
              justifyContent: "flex-start",
              "&:hover": {
                borderColor: "#fff",
                color: "#fff",
              },
            }}
          >
            <NodeContent node={data.choices[0]} />
          </Button>
        </Grid>
        <Grid xs={6} sx={{ padding: "0 32px" }}>
          <Button
            onClick={() => handleOnClick(1)}
            variant="outlined"
            value={1}
            sx={{
              transition: "0.5s",
              fontFamily: "VT323, sans-serif",
              color: "rgba(255, 255, 255, 0.60)",
              fontSize: "20px",
              borderColor: "rgba(255, 255, 255, 0.60)",
              margin: "8px",
              width: "100%",
              justifyContent: "flex-start",
              "&:hover": {
                borderColor: "#fff",
                color: "#fff",
              },
            }}
          >
            <NodeContent node={data.choices[1]} />
          </Button>
        </Grid>
        <Grid xs={6} sx={{ padding: "0 32px" }}>
          <Button
            onClick={() => handleOnClick(2)}
            variant="outlined"
            value={2}
            sx={{
              transition: "0.5s",
              fontFamily: "VT323, sans-serif",
              color: "rgba(255, 255, 255, 0.60)",
              fontSize: "20px",
              borderColor: "rgba(255, 255, 255, 0.60)",
              margin: "8px",
              width: "100%",
              justifyContent: "flex-start",
              "&:hover": {
                borderColor: "#fff",
                color: "#fff",
              },
            }}
          >
            <NodeContent node={data.choices[2]} />
          </Button>
        </Grid>
        <Grid xs={6} sx={{ padding: "0 32px" }}>
          <Button
            onClick={() => handleOnClick(3)}
            variant="outlined"
            // className = {}
            sx={{
              transition: "0.5s",
              fontFamily: "VT323, sans-serif",
              color: "rgba(255, 255, 255, 0.60)",
              fontSize: "20px",
              borderColor: "rgba(255, 255, 255, 0.60)",
              margin: "8px",
              width: "100%",
              justifyContent: "flex-start",
              "&:hover": {
                borderColor: "#fff",
                color: "#fff",
              },
            }}
          >
            <NodeContent node={data.choices[3]} />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GameQuestions;
