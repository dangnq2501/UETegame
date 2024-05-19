import * as React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";

// Images
import bg from "../../assets/images/bg.jpg";

const Summary = () => {
  return (
    <Box
      component="section"
      className="MainFeatureSection"
      id="summary_section"
      sx={(theme) => ({
        pt: 40,
        pb: 40,
        backgroundImage: `url(${bg.src})`,
      })}
    >
      <Container maxWidth="xl" sx={{ padding: "0 2% !important" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#fff",
              fontFamily: "FVF_Fernando_08,sans-serif",
              lineHeight: "normal",
              textAlign: "center",
              paddingBottom: "32px",
              filter: "drop-shadow(2px 4px 6px rgb(35 33 33 / 20%))",
            }}
          >
            Join hundred of people having fun while accomplishing their goals!
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#013370",
              padding: "10px 24px",
              "&:hover": {
                backgroundColor: "#9A62FF",
              },
            }}
          >
            Join UETegame Today
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Summary;
