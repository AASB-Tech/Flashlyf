/*
    This React hook, is used to create an animation loop using the requestAnimationFrame function. 
    It takes a callback function as an argument, which will be executed on each animation frame.
*/

import { useEffect, useRef } from "react";

export const useAnimate = callback => {
    // The requestRef ref is used to store the reference to the current animation frame request.
    const requestRef = useRef();
    // The previousTimeRef ref is used to store the previous timestamp of the animation frame.
    const previousTimeRef = useRef();

    const animate = time => {
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef.current;
            callback(deltaTime);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    };

    // The useEffect hook is used to start the animation loop when the component using this hook mounts.
    // The dependency array [] in the useEffect hook ensures that the effect is only run once 
    // during the component's lifecycle, preventing unnecessary re-rendering and multiple animation loops.
    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);
};

// How to use this hook:

/*
    In this example, the animateCallback function is passed to the useAnimate hook. 
    The animateCallback function will be invoked on each animation frame,
    providing the deltaTime as an argument. 
    You can perform animation-related logic inside the callback function using the deltaTime.
*/

/*
import React from "react";
import { useAnimate } from "./useAnimate";

const ExampleComponent = () => {
  const animateCallback = (deltaTime) => {
    // Perform animation-related logic using the deltaTime
  };

  useAnimate(animateCallback);

  // Rest of the component logic...
};
*/
