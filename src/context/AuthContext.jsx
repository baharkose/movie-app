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
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext();
export const useAuthContext = () => {
  return useContext(AuthContext);
};
const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const navigate = useNavigate();
  const createUser = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  };
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/");
     
    } catch (error) {
     console.log(error)
    }
  };
  const userObserver = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, displayName, photoURL });
        sessionStorage.setItem(
          "user",
          JSON.stringify({ email, displayName, photoURL })
        );
      } else {
        setCurrentUser(false);
        sessionStorage.removeItem("user");
      }
    });
  };
  const signUpProvider = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const logOut = () => {
    signOut(auth);
  };
  const forgotPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      
  };
  useEffect(() => {
    userObserver();
  }, []);
  const values = {
    createUser,
    signIn,
    logOut,
    currentUser,
    signUpProvider,
    forgotPassword,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;