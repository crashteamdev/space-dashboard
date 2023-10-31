import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const forgotPassword = (email: string) => {
  const auth = getAuth();
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