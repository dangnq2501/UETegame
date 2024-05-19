import { Box, Stack, Typography } from "@mui/material";
import IconStat from "./IconStat";
import { useGameContext } from "../../contexts/game";

export default function StatBar() {
  const { health, armor, damage, gem, character, effects } = useGameContext();

  return (
    <Stack
      sx={{
        background: "#34495e",
        mt: 2,
        px: 2,
        py: 1,
        borderRadius: 2,
      }}
      direction="row"
      justifyItems="center"
      justifyContent="space-between"
      spacing={2}
    >
      <Stack direction="row" alignItems="center" spacing={3}>
        <IconStat
          icon="health"
          width={75}
          value={`${health}/${character.maxHealth}`}
        />
        <IconStat icon="armor" width={35} value={armor} />
        <IconStat icon="damage" width={35} value={damage} />
        <Stack direction="row" spacing={1}>
          {Object.values(effects).map((effect) => (
            <Box key={effect.potionName}>
              <img
                src={`/assets/game/images/${effect.potionName}.png`}
                alt="icon"
                width={24}
                height={24}
                style={{ imageRendering: "pixelated" }}
              />
              <Typography
                variant="caption"
                color="white"
                fontFamily="Pixel"
                sx={{ ml: "-5px" }}
              >
                {effect.duration}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Stack>
      <Box>
        <Stack direction="row">
          <Typography
            variant="subtitle1"
            color="white"
            fontFamily="Pixel"
            sx={{ color: "#4cd137" }}
          >
            {gem}
          </Typography>
          <img
            src={`/assets/game/images/gem.png`}
            alt="icon"
            width={24}
            height={24}
            style={{
              imageRendering: "pixelated",
              marginTop: "5px",
            }}
          />
        </Stack>
      </Box>
    </Stack>
  );
}
