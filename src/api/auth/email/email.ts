import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
export const signInEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("ErrorCode: ", errorCode);
      console.error("ErrorMessage: ", errorMessage);
      return false;
    });
};
