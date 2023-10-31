import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

export const forgotPassword = (email: string) => {
  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
};