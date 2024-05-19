import { Box, Typography } from "@mui/material";

export default function NodeContent({ node, ...props }) {
  console.log(node)
  return (
    <Typography variant="caption" fontFamily="Pixel" {...props}>
      <Box
        sx={{
          textTransform: "none",
        }}
      >
        {node}
      </Box>
    </Typography>
  );
}
