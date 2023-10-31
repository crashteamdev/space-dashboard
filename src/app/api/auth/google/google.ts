import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
export const signInGoogle = () => {

  const auth = getAuth();

  return signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    return user
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
};