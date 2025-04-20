import { auth } from "@/shared/firebase/firebase";
import { User } from "firebase/auth";

export const getCurrentUser = (): User | null => {
    return auth.currentUser;
};