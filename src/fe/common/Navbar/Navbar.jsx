import * as React from "react";
import {
  AppBar,
  Container,
  Typography,
  Toolbar,
  Menu,
  MenuItem,
  Box,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";
import { logout } from "@/models/auth";
import Image from "next/image";

// Images
import cat from "../../assets/images/cat.jpg";

export const Navbar = ({ userData }) => {
  const bs_links = [
    "#hero_section",
    "#main_feature_section",
    "#benefit_section",
  ];
  const bs_pages = ["Get Started", "Learn More", "Activities"];
  const [links, setLinks] = React.useState(bs_links);
  const [pages, setPages] = React.useState(bs_pages);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [deskAnchorEl, setDeskAnchorEl] = React.useState(null);
  const open = Boolean(deskAnchorEl);
  const router = useRouter();
  const removeRoutes = ["/login", "/register"];

  React.useEffect(() => {
    if (router.pathname == "/") {
      setLinks(bs_links);
      setPages(bs_pages);
    } else {
      setLinks(["/dashboard", "/group"]);
      setPages(["Dashboard", "Group"]);
    }
  }, [router.pathname]);

  const handleClick = (event) => {
    setDeskAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setDeskAnchorEl(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  if (!removeRoutes.includes(router.pathname)) {
    return (
      <nav>
        <AppBar position="static" sx={{ backgroundColor: "#013370!important" }}>
          <Container
            maxWidth="xl"
            sx={{
              padding: "0 2% !important",
            }}
          >
            <Toolbar disableGutters>
                <Image
                    src="/UETegame.png" // Update path to your logo image
                    alt="UETegame"
                    width={100} // Adjust width as needed
                    height={50}  // Adjust height as needed
                    style={{
                        marginRight: 10,
                        display: { xs: "none", md: "flex" },
                    }}
                />

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="default"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page, index) => (
                    <MenuItem
                      key={page}
                      component={"a"}
                      href={links[index]}
                      onClick={handleCloseNavMenu}
                    >
                      <Typography
                        textAlign="center"
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          color: "#FFFFFF !important",
                          textTransform: "capitalize!important",
                        }}
                      >
                        {page}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={(theme) => ({
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontWeight: 700,
                  fontFamily: "Andy, sans-serif",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "1.5rem",
                  [theme.breakpoints.down("md")]: {
                    fontSize: "1rem",
                  },
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "0.8rem",
                    mr: 0,
                  },
                })}
              >
                UETegame
              </Typography>

              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  justifyContent: "flex-start",
                }}
              >
                {pages.map((page, index) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    component="a"
                    href={links[index]}
                    sx={(theme) => ({
                      my: 2,
                      display: "block",
                      textTransform: "capitalize!important",
                      fontFamily: "Inter, sans-serif",
                      padding: "6px 32px",
                      color: "#BDCADB",
                      "&:hover": {
                        color: "#FFF",
                      },
                    })}
                    className={router.pathname == links[index] && "nav_bold"}
                  >
                    {page}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0, display: "flex", gap: "16px" }}>
                <Button
                  variant="contained"
                  component="a"
                  href="/join"
                  sx={(theme) => ({
                    backgroundColor: "transparent",
                    border: "1px solid #fff",
                    color: "#BDCADB",
                    borderRadius: "0px",
                    textTransform: "capitalize!important",
                    fontFamily: "Inter, san-serif",
                    [theme.breakpoints.down("md")]: {
                      fontSize: "0.6rem",
                    },
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "0.5rem",
                    },
                    "&:hover": {
                      color: "#fff",
                    },
                  })}
                >
                  Enter Code
                </Button>

                {localStorage.getItem("uid") ? (
                  <>
                    <IconButton
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      // onClick={logout}
                      onClick={handleClick}
                      sx={{ padding: "0px" }}
                    >
                      <Avatar
                        alt="Cat"
                        src={cat.src}
                        sx={{
                          border: "1px solid #fff",
                        }}
                      />
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={deskAnchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem component="a" href="/dashboard">
                        Dashboard
                      </MenuItem>
                      {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                      <MenuItem component="a" href="/create_game">
                        Create quiz
                      </MenuItem>
                      <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    component="a"
                    href="/login"
                    variant="contained"
                    sx={(theme) => ({
                      backgroundColor: "#013370",
                      fontColor: "#BDCADB",
                      borderRadius: "0px",
                      textTransform: "capitalize!important",
                      fontFamily: "Inter, san-serif",
                      paddingRight: "28px",
                      paddingLeft: "28px",
                      [theme.breakpoints.down("md")]: {
                        fontSize: "0.6rem",
                      },
                      [theme.breakpoints.down("sm")]: {
                        fontSize: "0.5rem",
                      },
                      "&:hover": {
                        backgroundColor: "#013370",
                      },
                    })}
                  >
                    Login
                  </Button>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </nav>
    );
  }
};
