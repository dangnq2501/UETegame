// import type { NextPage } from "next";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

import { Typography, Box, Button, TextField } from "@mui/material";

import { SEO } from "../components/SEO";

// Images
import city from "../assets/images/city.gif";

const Join = () => {
  const router = useRouter();
  const [code, setCode] = React.useState();

  const handleChange = (e) => {
    e.preventDefault();
    let data = e.target.value;
    setCode(data);
  };

  const handleJoin = (e) => {
    if (code == null || code == "") return;
    fetch(process.env.NEXT_PUBLIC_BACKEND_URI + "/room/join", {
      method: "POST",
      body: JSON.stringify({
        uid: localStorage.getItem("uid"),
        data: code,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.msg);
        router.push(`/gameroom/${code}`);
      });
  };

  return (
    <>
      <SEO
        url={`${"https://UETegame.games"}/join`}
        openGraphType="website"
        schemaType="article"
        title={`Join`}
        description={"Join new game with other players"}
        image={
          "https://images.unsplash.com/photo-1656312193617-b8d43d0b9535?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80"
        }
      />
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
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "4%",
            gap: "32px",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "#fff",
              fontFamily: "VT323, monospace",
              lineHeight: "normal",
              textShadow: "0px 4px rgba(0, 0, 0, 0.25)",
              fontSize: "10rem",
            }}
          >
            JOIN GAME
          </Typography>

          <Box
            sx={{
              display: "flex",
              backgroundColor: "#fff",
              width: "35%",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 4px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <TextField
              label="Enter Code Here (Number Only)"
              variant="filled"
              value={code}
              // type='number'
              onChange={handleChange}
              sx={{
                width: "100%",
                fontWeight: "bold",
                "& > div": {
                  backgroundColor: "#fff",
                  borderRadius: "0px",
                  border: "0px",
                },
                "& > label": {
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  lineHeight: "24px",
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                borderRadius: "0px",
                padding: "10px 32px",
                width: "fit-content",
                height: "fit-content",
                backgroundColor: "#0698F9",
              }}
              onClick={handleJoin}
            >
              JOIN
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Join;
