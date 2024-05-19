import React, { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import Image from "next/image";

import image1 from "../../assets/images/login_bg.jpg";

const MemberCard = ({ number, isButton, data }) => {
  const [userData, setUserData] = useState("");
  const [balance, setBalance] = useState("");

  if (data) {
    if ("overall" in data.data) {
      setBalance(data.data.overall.toString());
    }

    useEffect(() => {
      fetch(process.env.NEXT_PUBLIC_BACKEND_URI + "/user/get", {
        method: "POST",
        body: JSON.stringify({
          uid: data.uid,
          data: data.uid,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json.data);
          setUserData(json.data);
        });
    }, []);

    if (userData) {
      return (
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            padding: "16px 0",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontFamily: "Poppins, sans-serif",
              color: "#11315B",
            }}
          >
            {number ? number : 1}
          </Typography>

          <Image
            src={image1}
            alt="ava"
            width={60}
            height={60}
            style={{
              objectFit: "cover",
              aspectRatio: "1/1",
              borderRadius: "200px",
              border: "3px solid #fff",
            }}
          />

          <Box sx={{}}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Poppins, sans-serif",
                color: "#451254",
              }}
            >
              {userData.uname}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Poppins, sans-serif",
                color: "#6E84AB",
              }}
            >
              {data.data.role.toUpperCase()} {"- " + balance}
            </Typography>
          </Box>
        </Box>
      );
    }
  }
};

export default MemberCard;
