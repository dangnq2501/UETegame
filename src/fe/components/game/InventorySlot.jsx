import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function InventorySlot({ item, onClick, onSell, isSelecting }) {
  const [showSell, setShowSell] = useState(false);

  return (
    <Button
      onClick={onClick}
      onMouseEnter={() => setShowSell(true)}
      onMouseLeave={() => setShowSell(false)}
      sx={{
        p: 1,
        borderRadius: 1,
        minWidth: 0,
        position: "relative",
        "&:hover": {
          bgcolor: "white",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <img
          src={`/assets/game/images/square_${isSelecting ? 0 : 1}.png`}
          draggable={false}
          style={{
            imageRendering: "pixelated",
            objectFit: "contain",
            width: "100%",
            height: "100%",
          }}
        />
      </Box>
      {item ? (
        <img
          src={`/assets/game/images/${item.name}.png`}
          width={32}
          height={32}
          draggable={false}
          style={{
            imageRendering: "pixelated",
            objectFit: "contain",
            transform: "rotate(45deg)",
          }}
        />
      ) : (
        <Box sx={{ width: 32, height: 32 }} />
      )}
      {showSell && item && (
        <IconButton
          onClick={onSell}
          sx={{
            position: "absolute",
            bottom: "-2px",
            right: "-2px",
            p: 0.5,
            width: 16,
            height: 16,
            borderRadius: 1,
            backgroundColor: "#e74c3c",
            "&:hover": {
              backgroundColor: "#c0392b",
            },
          }}
        >
          <img src="/assets/game/images/close.png" width={12} height={12} />
        </IconButton>
      )}
      {item && (
        <Box
          sx={{
            position: "absolute",
            bottom: "-5px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
          }}
        >
          <LinearProgress
            value={item ? (item.durability / item.maxDurability) * 100 : 0}
            variant="determinate"
            sx={{
              height: 4,
              borderRadius: 1,
              bgcolor: "#2c3e50",
              "& .MuiLinearProgress-bar": {
                borderRadius: 1,
                bgcolor: item
                  ? item.durability / item.maxDurability > 0.5
                    ? "#27ae60"
                    : item.durability / item.maxDurability > 0.25
                    ? "#f1c40f"
                    : "#e67e22"
                  : "#e74c3c",
              },
            }}
          />
        </Box>
      )}
    </Button>
  );
}
