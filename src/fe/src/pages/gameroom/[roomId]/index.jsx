import { Box } from "@mui/material";
import GameRoomMember from "../../../components/GameRoomMember/GameRoomMember";
import city from "../../../assets/images/city.gif";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { socket } from "../../../models/wsEventListener";

import { SEO } from "../../../components/SEO";

export default function GameRoom() {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [role, setRole] = useState("");
  const [roomData, setRoomData] = useState("");

  const startGame = useCallback(() => {
    console.log("Start");
    socket.emit("post-start");
  }, []);

  const leaveGame = useCallback(() => {
    console.log("Leave");
    fetch(process.env.NEXT_PUBLIC_BACKEND_URI + "/room/leave", {
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
        router.push("/dashboard");
      });
  }, []);

  useEffect(() => {
    socket.emit(
      "post-joinRoom",
      localStorage.getItem("uid"),
      router.query.roomId
    );

    setTimeout(() => {
      socket.emit("post-ready", 1);
    }, 50);

    socket.on("get-join", (state) => {
      // console.log('join state', state)
      setData((data) => {
        let ball_data = {
          user: state,
          data: {
            mode: 1,
          },
        };
        return [...data, ball_data];
      });
    });

    socket.on("get-leave", (state) => {
      console.log("Leave State:", state);
      setData((data) => {
        let tr_data = [...data];
        let ensure = false;
        // console.log('Before data:', tr_data)
        tr_data.forEach((usr, idx) => {
          if (usr.user.uid == state && !ensure) {
            tr_data.splice(idx, 1);
            ensure = true;
          }
        });
        // console.log('after data', tr_data)
        return tr_data;
      });
    });
  }, []);

  useEffect(() => {
    socket.on("get-start", (state) => {
      // console.log(state);

      if (state == 1) {
        socket.emit("post-ready", 2);
      } else {
        console.log("role", role);
        if (role == "Admin") {
          console.log("Push Admin");
          router.push(`/gamemaster/${router.query.roomId}`);
        } else if (role == "Member") {
          console.log("Push Member");
          router.push(`/game/${router.query.roomId}`);
        }
      }
    });
  }, [role]);

  useEffect(() => {
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
        console.log("room list: ", json.data);
        setData(json.data);
      });

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
        let value = json.data;
        setRoomData(value);
        if (value.owner == localStorage.getItem("uid")) {
          setRole("Admin");
        } else {
          setRole("Member");
        }
      });
  }, []);

  if (data) {
    return (
      <>
        <SEO
          url={`${"https://UETegame.games"}/gameroom/${router.query.roomId}`}
          openGraphType="website"
          schemaType="article"
          title={`Game Room - ${router.query.roomId}`}
          description={"Waiting until the game start. Enjoy a cup of coffee!"}
          image={
            "https://images.unsplash.com/photo-1656312193617-b8d43d0b9535?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80"
          }
        />
        <Box
          component="section"
          sx={{
            height: "100vh",
          }}
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
            <GameRoomMember
              onStart={startGame}
              leaveGame={leaveGame}
              data={data}
              role={role}
              rid={router.query.roomId}
              roomData={roomData}
            />
          </Box>
        </Box>
      </>
    );
  }
}
