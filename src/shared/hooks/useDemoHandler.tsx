import { useEffect } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "../store/hooks";
import { addItem } from "../store/slices/alerts/AlertsSlice";
import { v4 as uuidv4 } from "uuid";
import axiosApiInstance from "../api/api";

export function useDemoHandler() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const url = new URL(window.location.href);
        const demoParam = url.searchParams.get("demo");

        if (demoParam && typeof window !== "undefined") {
            localStorage.setItem("demo", demoParam);
        }
    
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            const demo = localStorage.getItem("demo");
            if (user && demo) {
                try {
                    await axiosApiInstance.get("https://api.marketdb.pro/gateway/demo", {
                        params: { id: demo }
                    });
                    localStorage.removeItem("demo");

                    dispatch(
                        addItem({
                            title: "Успешно!",
                            description: "Вам выдан демо-режим на 3 дня!",
                            status: "success",
                            timelife: 4000,
                            id: uuidv4()
                        })
                    );
                } catch (error) {
                    console.error("Ошибка выдачи демо: ", error);
                }
            }
        });
    
        return () => unsubscribe();
    }, []);
}