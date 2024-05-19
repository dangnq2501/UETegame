// import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebaseInit";

// Components
import { HeroSection } from "../common/HeroSection/HeroSection"
import MainFeature from "../components/MainFeature/MainFeature"
import Benefit from "../components/Benefit/Benefit"
import Summary from "../components/Summary/Summary"

import { SEO } from '../components/SEO'

const Index = () => {
  // const initUser = { uname: "def", email: "", priv: "", uid: "" };
  // const [userInfo, setInfUserInfo] = useState(initUser);
  // const [user, loading] = useAuthState(auth);
  // const [loading2, setLoading] = useState(false);
  // // console.log("auth from idx:", auth);
  // // console.log("user from idx:", user);
  // useEffect(() => {
  //   async function upd() {
  //     setLoading(true);
  //     if (!loading && user) {
  //       setInfUserInfo(await getUserInfo(user.uid));
  //     }
  //     else {
  //       setInfUserInfo(initUser);
  //     }
  //     setLoading(false);
  //   }
  //   upd();
  // }, [user]);
  // if (loading || loading2) {
  //   return (
  //     <div>
  //       <h1>Loading...</h1>
  //     </div>
  //   )
  // }

  return (
    <>
      <SEO
        url={`${'https://UETegame.games'}/`}
        openGraphType="website"
        schemaType="article"
        title={`Homepage`}
        description={"UETegame là một sản phẩm nhắm tới mục đích tự động hóa việc chuyển những file câu hỏi nhàm chán thành những game RPG đầy sự thú vị và hứng thú. Thử UETegame ngay hôm nay."}
        image={"https://images.unsplash.com/photo-1656312193617-b8d43d0b9535?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80"}
      />
      <HeroSection
        isButton={true}
        title={"Play, learn, and get reward.."}
        description={"Enhance your learning experience with teacher by gamify your test into RPG game to fight boss and compete to get the MYSTERIOUS reward."}
      />
      <MainFeature />
      <Benefit />
      <Summary />
    </>
  )
};

export default Index;
