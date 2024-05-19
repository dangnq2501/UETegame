import { Stack, Typography } from "@mui/material";

export default function IconStat({ icon, value, width }) {
  return (
    <Stack direction="row" sx={{ width }}>
      <img
        src={`/assets/game/images/${icon}.png`}
        alt="icon"
        width={18}
        height={18}
        style={{
          imageRendering: "pixelated",
          marginTop: "5px",
        }}
      />
      <Typography
        variant="subtitle2"
        color="white"
        fontFamily="Pixel"
        sx={{ ml: 1 }}
      >
        {value}
      </Typography>
    </Stack>
  );
}
