"use client"

import { useEffect } from "react";

export default function serviceWorkerProvider() {
    useEffect(() => {
        // Service worker for PWA (Progressive Web App)
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then((registration) => { 
                    console.log('service worker scope is: ', registration.scope)
                    // registration.pushManager.subscribe({
                    //     userVisibleOnly: true,
                    //     applicationServerKey,
                    // })
            })
            .catch((error) => {
                console.error('Error registering service worker:', error);
            })
        }
    }, []);

    return (
        <>
        </>
    )
}
