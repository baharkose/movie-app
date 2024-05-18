import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../auth/firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, displayName, photoURL });
        sessionStorage.setItem("user", JSON.stringify({ email, displayName, photoURL }));
      } else {
        setCurrentUser(null);
        sessionStorage.removeItem("user");
      }
    });
    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  const handleUserAuth = async (email, password, displayName = '', update = false) => {
    try {
      const userCredential = await (update ?
        signInWithEmailAndPassword(auth, email, password) :
        createUserWithEmailAndPassword(auth, email, password));
      
      if (displayName) {
        await updateProfile(auth.currentUser, { displayName });
      }
      navigate("/");
      toastSuccessNotify(update ? "Logged in successfully!" : "Registered successfully!");
    } catch (error) {
      console.log(error);
      toastErrorNotify(error.message);
    }
  };

  const logOut = () => {
    signOut(auth).then(() => {
      toastSuccessNotify("Logged out successfully");
    });
  };

  const signUpProvider = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(() => {
        navigate("/");
        toastSuccessNotify("Logged in successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const forgotPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toastSuccessNotify("Please check your email");
      })
      .catch((error) => {
        toastErrorNotify(error.message);
      });
  };

  const values = {
    createUser: (email, password, displayName) => handleUserAuth(email, password, displayName, false),
    signIn: (email, password) => handleUserAuth(email, password, '', true),
    logOut,
    currentUser,
    signUpProvider,
    forgotPassword,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
