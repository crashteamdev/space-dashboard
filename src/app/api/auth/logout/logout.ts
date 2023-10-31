import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export const logout = () => {
  localStorage.setItem('remember', 'off')
  signOut(auth).then(() => {
  }).catch((error) => {
  });
};