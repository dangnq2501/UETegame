import { Box, Stack, Typography } from "@mui/material";
import StatBar from "../../components/game/StatBar";
import InventoryBar from "../../components/game/InventoryBar";
import GameBoard from "../../components/game/GameBoard";
import { GAME_WIDTH } from "../../config/game";
import { GameProvider } from "../../contexts/game";
import CoreGame from "../../components/CoreGame";
import EndGameModal from "../../components/EndGameModal";

import { SEO } from "../../components/SEO";

import { useRouter } from "next/router";

const GamePage = () => {

  const router = useRouter();

  return (
    <GameProvider>
      <>
        <SEO
          url={`${'https://UETegame.games'}/game/${router.query.roomId}`}
          openGraphType="website"
          schemaType="article"
          title={`Game - ${router.query.roomId}`}
          description={"Enjoy your game with other players"}
          image={"https://images.unsplash.com/photo-1656312193617-b8d43d0b9535?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80"}
        />
        <Stack
          direction="column"
          alignItems="center"
          justifyItems="center"
          sx={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "#2c3e50",
          }}
        >
          <Box sx={{ width: `${GAME_WIDTH}px` }}>
            <StatBar />
            <InventoryBar />
            <GameBoard />
            <EndGameModal />
          </Box>
        </Stack>
        <CoreGame />
      </>
    </GameProvider>
  );
};

export default GamePage;
