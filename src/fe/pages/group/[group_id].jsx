import React from "react";
import {
  Typography,
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import { Select, Input } from "antd";

import Image from "next/image";
import { useRouter } from "next/router";

import GroupCard from "../../common/GroupCard/GroupCard";
import MemberCard from "../../common/MemberCard/MemberCard";

import { SEO } from "../../components/SEO";

import image1 from "../../assets/images/login_bg.jpg";
import SearchIcon from "@mui/icons-material/Search";

const Group = () => {
  const router = useRouter();
  const group_id = router.query.group_id;
  const size = 4;

  // State
  const [searchData, setSearchData] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [basicData, setBasicData] = React.useState(null);
  const [members, setMembers] = React.useState(null);
  const [rooms, setRooms] = React.useState(null);
  const [role, setRole] = React.useState("Member");

  const options = [
    { value: "Recent", label: "Recent" },
    { value: "Difficulty", label: "Difficulty" },
    { value: "Oldest", label: "Oldest" },
    { value: "Questions", label: "Questions" },
  ];

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearchData(e.target.value);
  };

  const handleSelect = (value) => {
    console.log(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  // useEffect
  React.useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URI + "/group", {
      method: "POST",
      body: JSON.stringify({
        uid: localStorage.getItem("uid"),
        data: {
          groupId: group_id,
        },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log(json.data);
        setBasicData(json.data);
        if (json.data.ownerId == localStorage.getItem("uid")) {
          setRole("Admin");
        } else {
          setRole("Member");
        }
      });

    fetch(process.env.NEXT_PUBLIC_BACKEND_URI + "/group/properties", {
      method: "POST",
      body: JSON.stringify({
        uid: localStorage.getItem("uid"),
        data: {
          groupId: group_id,
        },
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log('properties:', json.data);

        // Members
        let data = [];
        if (json.data.members) {
          for (const [key, value] of Object.entries(json.data.members)) {
            // console.log(key, value);
            data.push({
              uid: key,
              data: value,
            });
          }
        }
        console.log("rooms:", rooms);
        setMembers(data);

        // Groups
        let room_tr = [];
        if ("rooms" in json.data) {
          for (const [key, value] of Object.entries(json.data.rooms)) {
            // console.log(key, value);
            room_tr.push({
              rid: key,
              data: value,
            });
          }
          setRooms(room_tr);
        }
      });
  }, []);

  if (basicData) {
    return (
      <>
        <SEO
          url={`${"https://UETegame.games"}/group/${router.query.group_id}`}
          openGraphType="website"
          schemaType="article"
          title={`Group - ${router.query.group_id}`}
          description={"Discover other games made by people in group"}
          image={
            "https://images.unsplash.com/photo-1656312193617-b8d43d0b9535?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80"
          }
        />
        <Box
          component="section"
          className="GroupSection"
          sx={(theme) => ({
            backgroundColor: "#F0F4FF",
          })}
        >
          <Container maxWidth="xl" sx={{ padding: "2% 2% !important" }}>
            {/* Title */}
            <Box
              sx={{
                paddingBottom: "16px",
                borderBottom: "2px solid #BDCADB",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "Poppins, sans-serif",
                  color: "#476285",
                }}
              >
                {basicData.name} - <b>{role}</b>
              </Typography>
            </Box>

            {/* Member Section */}
            <Box sx={{ padding: "4% 0" }}>
              {/* Title */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: "2%",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "bold",
                    color: "#21204A",
                  }}
                >
                  Members
                </Typography>

                <Button
                  variant="outlined"
                  onClick={handleClickOpen}
                  sx={{
                    borderColor: "#6692CC",
                    color: "#6692CC",
                    textTransform: "capitalize",
                    "&:hover": {
                      borderColor: "#6692CC",
                      color: "#6692CC",
                    },
                  }}
                >
                  See all
                </Button>
              </Box>

              {/* Member Card */}
              <Box sx={{}}>
                <Grid container spacing={2} sx={{}}>
                  {members &&
                    members.map((item, key) => {
                      return (
                        <Grid xs={size} key={key}>
                          <MemberCard number={key} data={item} />
                        </Grid>
                      );
                    })}
                </Grid>
              </Box>

              <Dialog
                fullWidth={true}
                maxWidth="md"
                open={open}
                onClose={handleClose}
              >
                <DialogTitle> Members </DialogTitle>
                <DialogContent sx={{ padding: "0px" }}>
                  <Box
                    container
                    sx={{
                      backgroundColor: "#fff",
                      padding: "16px",
                    }}
                  >
                    {members &&
                      members.map((item, key) => {
                        return <MemberCard number={key} data={item} />;
                      })}
                  </Box>
                </DialogContent>
              </Dialog>
            </Box>

            {/* Explore Section */}
            <Box sx={{ padding: "4% 0" }}>
              {/* Title */}
              <Box
                sx={{
                  display: "flex",
                  // justifyContent: 'space-between',
                  gap: "16px",
                  paddingBottom: "2%",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: "bold",
                    color: "#21204A",
                  }}
                >
                  Explore Group Games
                </Typography>

                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#CDE2FE",
                    color: "#11315B",
                    textTransform: "capitalize",
                    fontSize: "16px",
                    padding: "10px 24px",
                    // borderRadius: '12px',
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#CDE2FE",
                      color: "#11315B",
                      boxShadow: "none",
                    },
                  }}
                >
                  Create Group Game
                </Button>
              </Box>

              {/* Tool Bar */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "2%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "4px",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      color: "#11315B",
                      fontWeight: "bold",
                    }}
                  >
                    Total:
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      color: "#9D9BB9",
                      // fontWeight:'bold'
                    }}
                  >
                    {rooms ? rooms.length : 0} Games
                  </Typography>
                </Box>
                <Input
                  size="large"
                  style={{ width: 720 }}
                  onChange={handleChange}
                  placeholder="Search Game"
                  prefix={<SearchIcon />}
                />
                <Box
                  sx={{
                    display: "flex",
                    gap: "16px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Poppins, sans-serif",
                        color: "#11315B",
                        fontWeight: "bold",
                      }}
                    >
                      Sort by:
                    </Typography>
                    <Select
                      defaultValue="Recent"
                      onChange={handleSelect}
                      style={{ width: 240 }}
                      size="large"
                      options={options}
                    />
                  </Box>
                </Box>
              </Box>

              <Grid container spacing={3}>
                {rooms ? (
                  rooms.map((item, key) => {
                    return (
                      <Grid xs={size} key={key}>
                        <GroupCard
                          img_src={""}
                          title={"Giải tích I"}
                          description={"Giải quyết những câu giải tích học búa"}
                          code=""
                          data={item}
                        />
                      </Grid>
                    );
                  })
                ) : (
                  <Typography variant="h5">There are no rooms yet</Typography>
                )}
              </Grid>
            </Box>
          </Container>
        </Box>
      </>
    );
  }
};

export default Group;
