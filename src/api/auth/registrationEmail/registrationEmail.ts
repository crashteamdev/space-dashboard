import { auth } from "@/shared/firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile, User } from "firebase/auth";

export const registrationEmail = async (email: string, password: string, displayName: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  await updateProfile(user, { displayName });
  return user;
};
