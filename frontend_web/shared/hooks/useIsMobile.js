/*
This React hook, is used to determine whether the current device is in a mobile view or not. 
It sets up an initial value for isMobile state variable as false.
If the inner width is less than 1024, it sets isMobile to true, indicating that the device is in a mobile view.

Additionally, the useEffect hook adds an event listener to the window's resize event, 
which triggers the updateSize function whenever the window is resized. 
This ensures that the isMobile value stays up-to-date with the current window size.
*/

import { useEffect, useState } from "react";

/* Simplified for now */

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateSize = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        updateSize();
        window.addEventListener("resize", updateSize);

        // Clean up function to avoid memory leaks when the component unmounts.
        return () => window.removeEventListener("resize", updateSize);
    }, [isMobile]);

    return { isMobile };
};

// How to use this hook:

/*
In this example, the isMobile variable will hold the boolean value indicating whether the device is in a mobile view or not. 
This value will automatically update when the window is resized.
You can then use this isMobile value to conditionally render different components or 
apply specific styles based on the device's view.
*/

/*
import React from "react";
import { useIsMobile } from "./useIsMobile";

const ExampleComponent = () => {
  const { isMobile } = useIsMobile();

  // Rest of the component logic...
};
*/
