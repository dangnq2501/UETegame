import { auth, fs } from "../config/firebaseInit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const getUserInfo = (uid) => {
  return new Promise(async (resolve) => {
    if (uid != "") {
      let lmao = (await getDoc(doc(fs, "user_data", uid))).data();
      console.log("got it", lmao);
      resolve(lmao);
    } else {
      resolve({ uname: "def", email: "", priv: "", uid: "" });
    }
  });
};

export async function register(email, password, userInfo) {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCred) => {
      // Signed in
      const user = userCred.user;
      localStorage.setItem("uid", user.uid);
      fetch(process.env.NEXT_PUBLIC_BACKEND_URI + "/user/init", {
        method: "POST",
        body: JSON.stringify({
          uid: user.uid,
          data: {
            uname: userInfo.uname,
            email: email,
            priv: "0",
            uid: user.uid,
          },
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then(() => {
          console.log("Reg: User created, logged in: ", user.uid);
        });
    })
    .catch((error) => {
      console.log("Reg: Something went wrong.");
      console.log(error.message);
      alert("Reg: Error occured!" + error.message);
    });
}

export async function login(email, password) {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCred) => {
      console.log("Login: User logged in: ", userCred.user.uid);
      localStorage.setItem("uid", userCred.user.uid);
    })
    .catch((error) => {
      console.log("Login: Something went wrong.");
      console.log(error.message);
      alert("Login: Error occured!" + error.message);
    });
}

export async function logout() {
  return signOut(auth)
    .then(() => {
      // Signed out
      console.log("Logout: Signout successful.");
      localStorage.removeItem("uid");
    })
    .catch((error) => {
      console.log("Logout: Something went wrong.");
      console.log(error.message);
    });
}
