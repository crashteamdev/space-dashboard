import firebase_app from "@/shared/firebase/firebase";
import { getAuth, onIdTokenChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export const useFirebaseToken = () => {
    const [token, setToken] = useState<string | null>(null);
    const auth = getAuth(firebase_app);
    useEffect(() => {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken();
                setToken(token);
            } else {
                setToken(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return token;
};