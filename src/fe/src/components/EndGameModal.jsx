import { useRouter } from "next/router";
import { useGameContext } from "../contexts/game";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";

export default function EndGameModal() {
  const { endGame } = useGameContext();
  const router = useRouter();

  return (
    <Modal open={endGame}>
      <Stack
        direction="column"
        alignItems="center"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "#34495e",
          borderRadius: 1,
          py: 4,
          px: 5,
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 5 }}
          color="white"
          fontFamily="Pixel"
        >
          The game is over!
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          sx={{ p: 2, fontFamily: "Pixel", mb: 2 }}
          onClick={() => router.push(`/summary/${router.query.roomId}`)}
        >
          Go to summary
        </Button>
      </Stack>
    </Modal>
  );
}
