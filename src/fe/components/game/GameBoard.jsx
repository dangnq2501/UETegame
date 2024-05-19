import { Box, Stack } from "@mui/material";
import { CARD_HEIGHT, CARD_WIDTH } from "../../config/game";
import Card from "./Card";
import { useGameContext } from "../../contexts/game";

export default function GameBoard() {
  const { cards, tryToMove } = useGameContext();

  return (
    <Stack
      alignItems="center"
      sx={{
        bgcolor: "#34495e",
        mt: 1,
        mb: 2,
        borderRadius: 2,
        p: 1,
      }}
    >
      <Box
        sx={{
          borderRadius: 2,
          width: CARD_WIDTH * 3,
          height: CARD_HEIGHT * 3,
          position: "relative",
        }}
      >
        {Object.keys(cards).map((cardId) => (
          <Card
            card={cards[cardId]}
            key={cardId}
            onClick={() => tryToMove(cards[cardId].x, cards[cardId].y)}
          />
        ))}
      </Box>
    </Stack>
  );
}
