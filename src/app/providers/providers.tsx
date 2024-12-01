"use client";
import posthog from 'posthog-js'
import {PostHogProvider} from 'posthog-js/react'

interface IPropsProviders {
    children: React.ReactNode;
}

export const Providers = ({children}: IPropsProviders) => {
    if (typeof window !== 'undefined') {
        posthog.init('phc_QhlnZCxS3pf7iwRwlPdlfxvJCurFRoVQPsCHy1mZpBW',
            {
                api_host: 'https://eu.i.posthog.com',
                person_profiles: 'identified_only'
            }
        )
    }
    return (
        <PostHogProvider client={posthog}>
            {children}
        </PostHogProvider>
    )
}
