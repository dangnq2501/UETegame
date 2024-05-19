import React from "react";
// var request = require('request');
import {
  Container,
  Typography,
  Box,
  Button,
  FormControl,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Input } from "antd";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";

import { useRouter } from "next/router";

import image1 from "../assets/images/login_bg.jpg";
import image2 from "../assets/images/star field.png";
import image3 from "../assets/images/day_gone.jpg";

import FileUploadIcon from "@mui/icons-material/FileUpload";
import { SEO } from "../components/SEO";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const CreateGame = () => {
  const [name, setName] = React.useState("");
  const [diff, setDiff] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [maxQuestion, setMaxQuestion] = React.useState("");
  const [tframe, setTframe] = React.useState("");
  const [group, setGroup] = React.useState("");
  const [file, setFile] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const [testid, setTestid] = React.useState(null);
  const [c_mode, setC_mode] = React.useState("quiz2quiz");

  const axios = require("axios");
  const FormData = require("form-data");

  const allow =
    name != "" &&
    diff != "" &&
    desc != "" &&
    tframe != "" &&
    file != "" &&
    testid != "" &&
    progress == 100;
  console.log(allow);

  const router = useRouter();

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearchData(e.target.value);
  };

  const handleSubmit = async () => {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_FLASK_URI + `/data/${testid}/answers`
    );

    fetch(process.env.NEXT_PUBLIC_BACKEND_URI + "/room/create", {
      method: "POST",
      body: JSON.stringify({
        uid: localStorage.getItem("uid"),
        data: {
          name: name,
          desc: desc,
          diff: diff,
          tframe: tframe,
          testid: testid,
          qnum: res.data.answers.length,
        },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data);
        router.push(`/gameroom/${json.data}`);
      });
    console.log("Submit");
  };

  const handleFileSelected = (e) => {
    const files = Array.from(e.target.files);
    console.log("files:", files);
    setFile(files);
    let data = new FormData();
    data.append("file", files[0]);
    let config;
    if (c_mode == "quiz2quiz") {
      config = {
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.NEXT_PUBLIC_FLASK_URI + "/api/quiz2quiz",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };
    } else {
      config = {
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.NEXT_PUBLIC_FLASK_URI + `/api/doc2quiz?num=${maxQuestion}`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: data,
      };
    }

    console.log("Push to flask");

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        let value = response.data;
        setTestid(value.testid);

        if (value) {
          const id = setInterval(async () => {
            console.log("inside: ", value);
            console.log("inside: ", value["testid"]);
            const res = await axios.get(
              process.env.NEXT_PUBLIC_FLASK_URI + `/data/${value.testid}/progress`
            );
            console.log(res.data);
            setProgress(res.data.value * 100);

            if (res.data.value == 1) {
              clearInterval(id);

              // router.push(`/gameroom/${}`)
            }
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <SEO
        url={`${"https://UETegame.games"}/create_game`}
        openGraphType="website"
        schemaType="article"
        title={`Create Game`}
        description={"Create new game"}
        image={
          "https://images.unsplash.com/photo-1656312193617-b8d43d0b9535?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80"
        }
      />
      <Box
        component="section"
        className="DashboardSection"
        sx={(theme) => ({
          backgroundColor: "#F0F4FF",
        })}
      >
        <Container maxWidth="xl" sx={{ padding: "0 2% !important" }}>
          <Box sx={{}}>
            <Grid container sx={{ padding: "6% 0" }} columnSpacing={6}>
              <Grid xs={4}>
                <Box
                  sx={{
                    display: "flex",
                    paddingRight: "64px",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        color: "#11315B",
                        fontWeight: "bold",
                        paddingBottom: "16px",
                      }}
                    >
                      Preview
                    </Typography>

                    <Box
                      sx={{
                        backgroundColor: "#fff",
                        borderRadius: "16px",
                        width: "fit-content",
                        padding: "16px",
                        borderRadius: "16px",
                      }}
                    >
                      <Image
                        src={image1}
                        width={400}
                        height={400}
                        alt="image"
                        style={{
                          objectFit: "cover",
                          borderRadius: "16px",
                          width: "100%",
                          height: "auto",
                          aspectRatio: "1/1",
                        }}
                      />
                      <Box sx={{ paddingTop: "20px" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "Poppins, sans-serif",
                            color: "#9D9BB9",
                          }}
                        >
                          Game name
                        </Typography>
                        <Input
                          size="large"
                          id="game_name"
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Game name"
                        />
                      </Box>
                      <Box sx={{ paddingTop: "16px" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "Poppins, sans-serif",
                            color: "#9D9BB9",
                          }}
                        >
                          Description
                        </Typography>
                        <Input
                          size="large"
                          id="game_name"
                          onChange={(e) => setDesc(e.target.value)}
                          placeholder="Description"
                        />
                      </Box>
                      <Box
                        sx={{
                          backgroundColor: "rgba(160, 160, 214, 0.10)",
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "8px 16px",
                          marginTop: "16px",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: "Poppins, sans-serif",
                              color: "#9D9BB9",
                            }}
                          >
                            Difficulty
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            {diff ? diff : "_"}
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: "Poppins, sans-serif",
                              color: "#9D9BB9",
                            }}
                          >
                            Questions
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: "bold",
                            }}
                          >
                            _
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid xs={7}>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#013370",
                    fontWeight: "bold",
                    fontFamily: "Poppins, sans-serif",
                    paddingBottom: "16px",
                  }}
                >
                  Create New Game
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Template Section */}
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        color: "#11315B",
                      }}
                    >
                      Game Template
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        color: "#8395AF",
                      }}
                    >
                      Choose your game theme to show to the players
                    </Typography>

                    <Grid
                      container
                      sx={{
                        margin: "16px 0",
                      }}
                    >
                      <Grid
                        xs={4}
                        sx={{
                          paddingRight: "16px",
                          position: "relative",
                        }}
                      >
                        <Image
                          src={image1}
                          width={400}
                          height={400}
                          style={{
                            width: "100%",
                            height: "auto",
                            aspectRatio: "16/10",
                            borderRadius: "12px",
                            boxShadow:
                              "0px 0px 0px 0px rgba(0, 0, 0, 0.10), 0px 2px 5px 0px rgba(0, 0, 0, 0.10), 0px 9px 9px 0px rgba(0, 0, 0, 0.09), 0px 21px 12px 0px rgba(0, 0, 0, 0.05), 0px 37px 15px 0px rgba(0, 0, 0, 0.01), 0px 57px 16px 0px rgba(0, 0, 0, 0.00)",
                          }}
                        />

                        <Typography
                          variant="h5"
                          sx={{
                            color: "#fff",
                            position: "absolute",
                            left: "13%",
                            top: "39%",
                          }}
                        >
                          Mysterious Night
                        </Typography>
                      </Grid>
                      <Grid
                        xs={4}
                        sx={{
                          padding: "0 8px",
                          position: "relative",
                        }}
                      >
                        <Image
                          src={image2}
                          width={400}
                          height={400}
                          style={{
                            width: "100%",
                            height: "auto",
                            aspectRatio: "16/10",
                            borderRadius: "12px",
                            boxShadow:
                              "0px 0px 0px 0px rgba(0, 0, 0, 0.10), 0px 2px 5px 0px rgba(0, 0, 0, 0.10), 0px 9px 9px 0px rgba(0, 0, 0, 0.09), 0px 21px 12px 0px rgba(0, 0, 0, 0.05), 0px 37px 15px 0px rgba(0, 0, 0, 0.01), 0px 57px 16px 0px rgba(0, 0, 0, 0.00)",
                          }}
                        />
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#fff",
                            position: "absolute",
                            left: "28%",
                            top: "39%",
                          }}
                        >
                          Star Field
                        </Typography>
                      </Grid>
                      <Grid
                        xs={4}
                        sx={{
                          paddingLeft: "16px",
                          position: "relative",
                        }}
                      >
                        <Image
                          src={image3}
                          width={400}
                          height={400}
                          style={{
                            width: "100%",
                            height: "auto",
                            aspectRatio: "16/10",
                            borderRadius: "12px",
                            boxShadow:
                              "0px 0px 0px 0px rgba(0, 0, 0, 0.10), 0px 2px 5px 0px rgba(0, 0, 0, 0.10), 0px 9px 9px 0px rgba(0, 0, 0, 0.09), 0px 21px 12px 0px rgba(0, 0, 0, 0.05), 0px 37px 15px 0px rgba(0, 0, 0, 0.01), 0px 57px 16px 0px rgba(0, 0, 0, 0.00)",
                          }}
                        />
                        <Typography
                          variant="h5"
                          sx={{
                            color: "#fff",
                            position: "absolute",
                            left: "32%",
                            top: "39%",
                          }}
                        >
                          Day Gone
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      color: "#11315B",
                      paddingBottom: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Difficulty
                  </Typography>
                  <FormControl
                    sx={{ width: "30ch", paddingBottom: "16px" }}
                    required
                  >
                    <InputLabel id="demo-simple-select-label">
                      Difficulty
                    </InputLabel>
                    <Select
                      id="nums_of_member"
                      value={diff}
                      label="Members"
                      onChange={(e) => setDiff(e.target.value)}
                    >
                      <MenuItem value={"Easy"}>Easy</MenuItem>
                      <MenuItem value={"Normal"}>Normal</MenuItem>
                      <MenuItem value={"Hard"}>Hard</MenuItem>
                    </Select>
                  </FormControl>

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      color: "#11315B",
                      fontWeight: "bold",
                    }}
                  >
                    Time For Each Question
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      color: "#6E84AB",
                      paddingBottom: "12px",
                    }}
                  >
                    Set the time limit for answering for each question
                  </Typography>

                  <TextField
                    variant="outlined"
                    label="Time limit for each question"
                    type="number"
                    value={tframe}
                    onChange={(e) => setTframe(e.target.value)}
                    sx={{ width: "30ch", paddingBottom: "16px" }}
                  />

                  {/* <Typography variant='body1' sx={{
                                        fontFamily: 'Poppins, sans-serif',
                                        color: '#11315B',
                                        paddingBottom: '12px',
                                        fontWeight: 'bold'
                                    }}>
                                        Group
                                    </Typography>
                                    <FormControl sx={{ width: '30ch', paddingBottom: '16px' }} required>
                                        <InputLabel id="demo-simple-select-label">Group</InputLabel>
                                        <Select
                                            id="nums_of_member"
                                            value={group}
                                            label="Members"
                                            onChange={(e) => setGroup(e.target.value)}
                                        >
                                            <MenuItem value={'Trò chơi vương quyền'}>Trò chơi vương quyền</MenuItem>
                                            <MenuItem value={'Trò chơi giải tích I'}>Trò chơi giải tích I</MenuItem>
                                            <MenuItem value={'Hard'}>Hard</MenuItem>
                                        </Select>
                                    </FormControl> */}

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      color: "#11315B",
                      fontWeight: "bold",
                    }}
                  >
                    Convert Mode
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      color: "#6E84AB",
                      paddingBottom: "16px",
                    }}
                  >
                    The default mode is quiz to quiz. Choose other mode in this
                    section
                  </Typography>

                  <FormControl
                    sx={{ width: "30ch", paddingBottom: "16px" }}
                    required
                  >
                    <InputLabel id="demo-simple-select-label">
                      Convert Mode
                    </InputLabel>
                    <Select
                      id="nums_of_member"
                      value={c_mode}
                      label="Members"
                      onChange={(e) => setC_mode(e.target.value)}
                    >
                      <MenuItem value={"quiz2quiz"}>Quiz File </MenuItem>
                      <MenuItem value={"doc2quiz"}>Document File</MenuItem>
                    </Select>
                  </FormControl>

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      color: "#11315B",
                      fontWeight: "bold",
                    }}
                  >
                    Question File
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      color: "#6E84AB",
                      paddingBottom: "12px",
                    }}
                  >
                    Please provide question file so that we can convert it to
                    game
                  </Typography>

                  {/* <Button variant='contained' component="label" >
                                        Upload File
                                        <input
                                            type="file"
                                            hidden
                                        />
                                    </Button> */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "center",
                    }}
                  >
                    <FormControl
                      sx={{ width: "30ch", marginBottom: "16px" }}
                      variant="outlined"
                    >
                      <InputLabel
                        htmlFor="outlined-adornment-file"
                        sx={{
                          maxWidth: "calc(100% - 50px)",
                        }}
                      >
                        {file[0] ? file[0].name : ""}
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        // type='file'
                        disabled
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              // onClick={handleClickShowPassword}
                              // onMouseDown={handleMouseDownPassword}
                              edge="end"
                              component="label"
                            >
                              <FileUploadIcon />
                              <input
                                type="file"
                                onChange={handleFileSelected}
                                hidden
                              />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                    <CircularProgressWithLabel
                      variant="determinate"
                      value={progress}
                      size={40}
                      thickness={4}
                    />
                  </Box>
                  {c_mode == "doc2quiz" && (
                    <>
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "Poppins, sans-serif",
                          color: "#6E84AB",
                          paddingBottom: "12px",
                        }}
                      >
                        Set the max number of questions
                      </Typography>

                      <TextField
                        variant="outlined"
                        type="number"
                        value={maxQuestion}
                        onChange={(e) => setMaxQuestion(Number(e.target.value))}
                        sx={{ width: "30ch", paddingBottom: "16px" }}
                      />
                    </>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!allow}
                    sx={{
                      width: "25ch",
                      backgroundColor: "#CDE2FE",
                      color: "#11315B",
                      textTransform: "capitalize",
                      fontSize: "16px",
                      padding: "10px 24px",
                      borderRadius: "12px",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "#CDE2FE",
                        color: "#11315B",
                        boxShadow:
                          "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
                      },
                    }}
                  >
                    Create
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CreateGame;
