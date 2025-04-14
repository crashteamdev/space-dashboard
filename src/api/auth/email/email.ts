import { auth } from "@/shared/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const signInEmail = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("ErrorCode: ", errorCode);
      console.error("ErrorMessage: ", errorMessage);
      return false;
    });
};
