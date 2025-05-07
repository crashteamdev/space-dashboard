"use client";
import { useDemoHandler } from "@/shared/hooks/useDemoHandler";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/shared/firebase/firebase";

export default function DemoPage() {
    useDemoHandler();

    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push("/profile");
            } else {
                router.push("/auth/login");
            }
        });
        return () => unsubscribe();
    }, [router]);
    return (
        <>
        </>
    );
}
