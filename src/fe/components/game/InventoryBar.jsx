import { Box, Button, Stack, Typography } from "@mui/material";
import Iconify from "../Inconify";
import { useGameContext } from "../../contexts/game";
import InventorySlot from "./InventorySlot";

export default function InventoryBar() {
  const {
    score,
    inventory,
    selectedSlotId,
    setSelectedSlotId,
    sellItem,
    streak,
  } = useGameContext();

  return (
    <Stack
      direction="row"
      sx={{ background: "#34495e", mt: 1, px: 2, py: 1, borderRadius: 2 }}
    >
      <Stack direction="row" spacing={1} sx={{ mr: 5 }}>
        {inventory.map((item, index) => (
          <InventorySlot
            key={index}
            item={item}
            onClick={() => setSelectedSlotId(index)}
            onSell={() => sellItem(index)}
            isSelecting={selectedSlotId === index}
          />
        ))}
      </Stack>
      <Box
        sx={{
          flexGrow: 1,
          border: "2px solid",
          borderColor: "#95a5a6",
          borderRadius: 3,
          position: "relative",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            position: "absolute",
            zIndex: 1,
            width: "100%",
            height: "100%",
            px: 2,
          }}
        >
          <Typography variant="caption" color="white" fontFamily="Pixel">
            Score: {score}
          </Typography>
          <Stack direction="row">
            <Typography variant="caption" color="white" fontFamily="Pixel">
              {streak}
            </Typography>
            <Iconify icon="mdi:fire" sx={{ color: "white", mt: "1px" }} />
          </Stack>
        </Stack>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            p: 0.5,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        >
          <Box
            sx={{
              borderRadius: 2,
              backgroundImage: "linear-gradient(to right, #e67e22, #f39c12)",
              height: "100%",
              width: `${Math.min((streak * 100) / 5, 100)}%`,
              transitionDuration: "0.5s",
            }}
          />
        </Box>
      </Box>
    </Stack>
  );
}
