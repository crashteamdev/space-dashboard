"use client";
import React from "react";
import posthog from "posthog-js";
import {PostHogProvider} from "posthog-js/react";

interface IPropsProviders {
    children: React.ReactNode;
}

export const Providers = ({children}: IPropsProviders) => {
    if (typeof window !== "undefined") {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || "",
            {
                api_host: "https://eu.i.posthog.com",
                person_profiles: "identified_only"
            }
        );
    }
    return (
        <PostHogProvider client={posthog}>
            {children}
        </PostHogProvider>
    );
};
