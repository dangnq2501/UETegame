import { useEffect, useState } from "react";
import { getUserInfo, logout } from "@/models/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebaseInit";
import { Typography, Box, Backdrop, CircularProgress } from "@mui/material";

import { Navbar } from "../../common/Navbar/Navbar";
import { Footer } from "../../common/Footer/Footer";

import { useRouter } from "next/router";

export default function Layout({ children }) {
  const initUser = { uname: "def", email: "", priv: "", uid: "" };
  const [userInfo, setInfUserInfo] = useState(initUser);
  const [user, loading] = useAuthState(auth);
  const [loading2, setLoading] = useState(false);
  const router = useRouter();
  const pushRoutes = ["/", "/login", "/register"];

  useEffect(() => {
    async function upd() {
      setLoading(true);
      if (!loading && user) {
        setInfUserInfo(await getUserInfo(user.uid));
      } else {
        setInfUserInfo(initUser);
      }
      setLoading(false);
    }
    upd();
  }, [user]);

  if (loading || loading2) {
    return (
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#4C6FFF",
        }}
        open={true}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" />
          <Typography
            variant="h4"
            sx={{
              fontSize: "1.5rem",
              fontFamily: "Inter, sans-serif",
              color: "#fff",
              pt: "8%",
            }}
          >
            Đang lấy dữ liệu
          </Typography>
        </Box>
      </Backdrop>
    );
  } else {
    console.log("user:", user);
    if (user != null && pushRoutes.includes(router.pathname)) {
      router.push("/dashboard");
    }
    if (user == null &&  router.pathname == "/dashboard") {
        router.push("/")
    }

    return (
      <>
        <Navbar userData={userInfo} />
        <main>{children}</main>
        <Footer />
      </>
    );
  }
}
