import { getAuth } from "firebase/auth";
import firebase_app from "./firebase";


export default async function IsGetAuth() {
  const auth = await getAuth(firebase_app);

  return auth
}