import firebase_app from "@/shared/firebase/firebase";
import firebase from "@/shared/firebase/firebase";
import { getAuth, getIdToken, onIdTokenChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState, useIdToken } from "react-firebase-hooks/auth";

const useAutoRefreshToken = async () => {
  try {
    const auth = getAuth(firebase_app);
    const currentUser = auth.currentUser
    if (currentUser) {
      const token = await currentUser.getIdToken()
      return token
    } else {
      return ''
    }
  } catch (exc) {
    console.error("ERROR DURING TOKEN REFRESH")
    return { status: 404, refreshedToken: null }
  }
};

export default useAutoRefreshToken;
