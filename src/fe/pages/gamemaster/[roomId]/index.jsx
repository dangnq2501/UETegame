// import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";

import { useRouter } from "next/router";
import Leaderboard from "../../../components/Leaderboard/Leaderboard";

import { SEO } from "../../../components/SEO";
// Images
// import character from "../../assets/images/character.png";
// import gem from "../../assets/images/gem.png";
import city from "../../../assets/images/city.gif";
import { socket } from "../../../models/wsEventListener";

const GameMaster = () => {
  const router = useRouter();

  const [dataRes, setData] = useState([]);
  const [qNum, setQNum] = useState(1);

  useState(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URI + "/room/get", {
      method: "POST",
      body: JSON.stringify({
        uid: localStorage.getItem("uid"),
        data: router.query.roomId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        let totQues = 1;
        console.log("num: ", json.data);
        if (json.data.qnum == 0) totQues = 1;
        else totQues = json.data.qnum;

        setQNum(totQues);

        fetch(process.env.NEXT_PUBLIC_BACKEND_URI + "/room/userlist", {
          method: "POST",
          body: JSON.stringify({
            uid: localStorage.getItem("uid"),
            data: router.query.roomId,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.json())
          .then((json) => {
            let data = [];
            data = json.data || [];
            let reme = -1;
            data.forEach((usr, idx) => {
              if (usr.data.mode == 9) reme = idx;
              else
                Object.assign(data[idx], {
                  rank: 0,
                  correctStreak: 0,
                  corCnt: 0,
                  totCnt: 0,
                  points: 0,
                  progress: 0,
                  qNum: totQues,
                });
            });
            if (reme > -1) data.splice(reme, 1);
            setData(data);
          });
      });
  }, []);

  useEffect(() => {
    socket.on(
      "get-playerData",
      (uid, correctStreak, corCnt, totCnt, points) => {
        setData((dataRes) => {
          dataRes.forEach((usr, idx) => {
            if (usr.user.uid == uid)
              Object.assign(dataRes[idx], {
                rank: 0,
                correctStreak,
                corCnt,
                totCnt,
                points,
                progress: ~~((totCnt / qNum) * 100),
                qNum,
              });
          });
          dataRes.sort((memA, memB) => {
            if (memA.points > memB.points) {
              return -1;
            } else return 1;
          });
          let rank = 1;
          dataRes.forEach((usr, idx) => {
            Object.assign(dataRes[idx], { rank: rank++ });
          });

          console.log("pls run: ", dataRes);

          let data = [...dataRes];
          return data;
        });
      }
    );
  }, [dataRes, qNum]);

  return (
    <>
      <SEO
        url={`${"https://UETegame.games"}/gamemaster/${router.query.roomId}`}
        openGraphType="website"
        schemaType="article"
        title={`Game Master - ${router.query.roomId}`}
        description={"Manage players performance"}
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
            // justifyContent: 'center',
            alignItems: "center",
            paddingBottom: "4%",
          }}
        >
          <Leaderboard data={dataRes} />
        </Box>
      </Box>
    </>
  );
};

export default GameMaster;
