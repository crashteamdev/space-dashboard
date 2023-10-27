import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export const logout = () => {
  localStorage.setItem('remember', 'off')
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
};