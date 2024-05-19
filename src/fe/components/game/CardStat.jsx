import { Box, Stack, Typography } from "@mui/material";

export default function CardStat({ icon, value }) {
  return (
    <Stack alignItems="center" spacing={0.5}>
      <Typography variant="caption" color="#9b1919" fontFamily="Pixel">
        <b>{value}</b>
      </Typography>
      <img
        src={`/assets/game/images/${icon}.png`}
        alt={icon}
        style={{
          width: "16px",
          height: "16px",
          imageRendering: "pixelated",
        }}
      />
    </Stack>
  );
}
