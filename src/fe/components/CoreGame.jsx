import { use, useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  Backdrop,
  CircularProgress,
  Typography,
} from "@mui/material";

import GameQuestions from "./GameQuestions";

import { useGameContext } from "../contexts/game";
import { socket } from "../models/wsEventListener";

export default function CoreGame() {
  // Basic states
  const [game, setGame] = useState(null);
  const [isAnswered, setAnswered] = useState(false);
  const [isCorrect, setCorrect] = useState("#fff");
  const [correct, setCorrectAnswer] = useState(null);
  const [done, setDone] = useState(true);
  const [message, setMessage] = useState("");
  const {
    health,
    armor,
    damage,
    gem,
    effects,
    character,
    onFinished,
    currentCard,
    currentQuestion,
    weapon,
    selectedSlotId,
    inventory,
  } = useGameContext();

  // currentCard is the monster that is being fought
  // currentCard.data is the data of the monster (@/config/game.jsx)
  // open dialog when currentCard is not null
  // dialog is closed automatically after calling onFinished

  // Example of data put in game and question section

  const gameDataTrash = {
    map: {
      name: "taiga",
      x: -130,
      y: -140,
    },
    character: "knight",
    monster: "orc",
    weapon: "wooden_sword",
  };

  // This is the basic data for game scene
  const [gameData, setGameData] = useState(gameDataTrash);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // Function that load phaser game into <div id ='game'/>
  const loadGame = async () => {
    console.log("Loading....");
    const Phaser = await import("phaser");
    const { default: BootGame } = await import("../scenes/BootGame");
    const { default: PlayGame } = await import("../scenes/PlayGame");

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 456,
      height: 240,
      fps: 60,
      title: "UETegame",
      parent: "game",
      scale: {
        zoom: 2,
      },
      scene: [
        new BootGame({ gem, character }),
        new PlayGame({ gem, character, gameData, setDone }),
      ],
      physics: {
        default: "arcade",
        arcade: {
          // debug: 'isDevelopment',
          debug: false,
        },
      },
    });

    game.events.on("putOnPlayGame", (event) => {
      setLoading(false);
    });
    setGame(game);
  };

  useEffect(() => {
    // Check if done animation
    if (loading) {
      setOpen(true);
      loadGame();
    } else {
      setOpen(false);
    }
  }, [loading]);

  // Not Important. Demo change data game instantly ( Can be removed )
  const changeNextQuestion = () => {
    console.log("change next question");
    game.destroy(true);
    if (gameData.map.name == "taiga") {
      setGameData({
        map: {
          name: "tundra",
          x: -240,
          y: -140,
        },
        character: "lancelot",
        monster: "orc",
      });
    } else {
      setGameData(gameDataTrash);
    }
  };

  // Handle when user choose answer
  const handleOnClick = async (value) => {
    // console.log('Clicked')
    // console.log(e.target.value)

    socket.emit("post-answer", currentQuestion.id, value, {
      hp: health,
      def: armor,
      atk: damage,
      buff: effects.blue ? effects.blue.amount : 0,
    });

    setAnswered(true);
  };

  const handleClose = () => {
    // setOpen(false);
    if (game) game.destroy(true);
    setGame(null);
    setAnswered(false);
    setMessage("");
    setCorrect("#fff");
    setDone(false);
  };

  useEffect(() => {
    if (currentCard != null) {
      loadGame();
      socket.emit("post-startQues", currentQuestion.id);
    }
  }, [currentCard]);

  useEffect(() => {
    if (!game) return;

    let correct;
    socket.on("get-answer", (id, isCorrect) => {
      if (isCorrect) {
        game.events.emit("Answer_Event", true);
        setCorrect("#1EF467");
        setMessage("Congratulation, you have the correct answer! 😎");
      } else {
        game.events.emit("Answer_Event", false);
        setAnswered(true);
        setCorrect("#EC6B5E");
        setMessage("Oh noo, wrong answer! 😥");
      }
      correct = isCorrect;
    });

    game.events.on("done", () => {
      handleClose();
      onFinished(correct);
    });

    return () => {
      socket.off("get-answer");
      game.events.off("done");
    };
  }, [game]);

  useEffect(() => {
    if (currentCard == null) return;
    localStorage.setItem("monster", currentCard.data.name);
    localStorage.setItem(
      "weapon",
      weapon == null ? "wooden_sword" : weapon.name
    );
  }, [selectedSlotId, currentCard, inventory]);

  if (loading) {
    return (
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#4C6FFF",
        }}
        open={true}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" />
          <Typography
            variant="h4"
            sx={{
              fontSize: "1.5rem",
              fontFamily: "Inter, sans-serif",
              color: "#fff",
              pt: "8%",
            }}
          >
            Loading game...
          </Typography>
          <Box
            id="game"
            sx={{ visibility: "hidden", position: "absolute" }}
          ></Box>
        </Box>
      </Backdrop>
    );
  }
  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open game
      </Button> */}
      {/* <Button variant="outlined" onClick={changeNextQuestion}>
        Change Map
      </Button> */}
      <Dialog
        fullWidth={false}
        maxWidth="lg"
        open={currentCard != null || open == true}
      >
        <DialogContent sx={{ padding: "0px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "fit-content",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box id="game" sx={{ height: "480px" }}></Box>
              {currentQuestion && (
                <GameQuestions
                  data={currentQuestion}
                  handleOnClick={handleOnClick}
                  correct={isCorrect}
                  answer={isAnswered}
                  message={message}
                />
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
