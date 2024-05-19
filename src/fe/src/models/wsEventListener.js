import { io } from "socket.io-client";

// const ws_url = "iaihackathon.engineer:3456";
const ws_url = process.env.NEXT_PUBLIC_WS_URI;
export const socket = io(ws_url);
console.log("WebSocket initialized at: ", ws_url);

socket.on("get-state", (uid, status) => {
  console.log(`User ${uid} is ${status ? "on" : "off"}line`);
});

socket.on("get-join", (data) => {
  console.log(`User ${data.uid} joined with data ${data}`);
});

socket.on("get-leave", (uid) => {
  console.log(`User ${uid} left`);
});

socket.on("get-ready", (uid, status) => {
  console.log(`User ${uid} get ready phase ${status}`);
});

socket.on("get-start", (status) => {
  console.log(`Game changed to phase ${status}`);
});

socket.on("get-answer", (qnum, verdict) => {
  console.log(`Question ${qnum} is ${verdict ? "" : "in"}correct`);
});

socket.on("get-playerData", (uid, streak, corAns, points) => {
  console.log(
    `User ${uid} data updated: Answered correctly ${corAns}, current streak ${streak}, got ${points}`
  );
});

socket.on("get-end", (uid, gems) => {
  console.log(`User ${uid} ended the game, got ${gems}`);
});

socket.on("get-stop", () => {
  console.log(
    `Forced to stop the game, need to submit and end the game immediately`
  );
});
