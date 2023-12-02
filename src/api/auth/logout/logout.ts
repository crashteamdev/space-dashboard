import { getAuth, signOut } from "firebase/auth";

export const logout = () => {
  const auth = getAuth();

  localStorage.setItem("remember", "off");
  signOut(auth);
};