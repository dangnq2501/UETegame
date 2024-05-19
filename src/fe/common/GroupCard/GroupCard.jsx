// import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Typography, Box, Button, Snackbar, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";
import { useRouter } from "next/router";

import CloseIcon from "@mui/icons-material/Close";

// Images
import bg1 from "../../assets/images/login_bg.jpg";
import bg2 from "../../assets/images/register_bg.jpg";

const GroupCard = ({ img_src, title, description, code, data }) => {
  const [cardData, setCardData] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const router = useRouter();

  if (data) {
    useEffect(() => {
      fetch(process.env.NEXT_PUBLIC_BACKEND_URI + "/room/get", {
        method: "POST",
        body: JSON.stringify({
          uid: localStorage.getItem("uid"),
          data: data.rid,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setCardData(json.data);

          if (json.data.diff < 0.4) {
            let config = {
              mess: "Easy",
              color: "#00D348",
            };
            setDifficulty(config);
          } else if (json.data.diff > 0.6) {
            let config = {
              mess: "Hard",
              color: "#FC1E1E",
            };
            setDifficulty(config);
          } else {
            let config = {
              mess: "Normal",
              color: "#E49B2E",
            };
            setDifficulty(config);
          }
        });
    }, []);

    const handleJoin = (e) => {
      if (data == null || data.rid == null || data.rid == "") return;
      fetch(process.env.NEXT_PUBLIC_BACKEND_URI + "/room/join", {
        method: "POST",
        body: JSON.stringify({
          uid: localStorage.getItem("uid"),
          data: data.rid,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          // if(json.msg.charAt(0) == 'o') {
          //     router.push(`/gameroom/${data.rid}`);
          // } else {
          //     setMessage(json.msg);
          //     setOpen(true)
          // }
          router.push(`/gameroom/${data.rid}`);
        });
    };

    const handleClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      setOpen(false);
    };

    const action = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );

    if (cardData) {
      return (
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "16px",
            padding: "12px",
            width: "fit-content",
            width: "100%",
            boxShadow:
              "0px 0px 0.5px 0px rgba(0, 0, 0, 0.10) inset, 6px 12px 18px 0px rgba(102, 146, 204, 0.08)",
          }}
        >
          <Image
            src={img_src ? img_src : bg1}
            alt="background"
            style={{
              aspectRatio: "16/12",
              width: "100%",
              height: "auto",
              borderRadius: "16px",
              objectFit: "cover",
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", pt: 3 }}>
            <Box>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: "bold",
                  color: "#11315B",
                }}
              >
                {cardData.name ? cardData.name : "Blank Title"}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: "Poppins, sans-serif", color: "#9D9BB9" }}
              >
                {cardData.desc ? cardData.desc : "Blank Description"}
              </Typography>
            </Box>
            <Button
              onClick={handleJoin}
              variant="contained"
              sx={{
                backgroundColor: "#0698F9",
                borderRadius: "0px",
                padding: "10px 24px",
              }}
            >
              JOIN
            </Button>
          </Box>

          <Box
            sx={{
              padding: "8px 16px",
              backgroundColor: "rgba(160, 160, 214, 0.10)",
              display: "flex",
              justifyContent: "space-between",
              borderRadius: "12px",
              marginTop: "16px",
            }}
          >
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  color: "#9D9BB9",
                }}
              >
                Difficulty
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  color: difficulty.color,
                  fontWeight: "bold",
                }}
              >
                {difficulty.mess}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  color: "#9D9BB9",
                }}
              >
                Questions
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  color: "#11315B",
                  fontWeight: "bold",
                }}
              >
                {cardData.qnum ? cardData.qnum : "0"}
              </Typography>
            </Box>
          </Box>

          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
            action={action}
          />
        </Box>
      );
    }
  }
};

export default GroupCard;
