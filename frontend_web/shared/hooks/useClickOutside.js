/*
    This React hook, is used to detect clicks that occur outside a specified element or component. 
    It helps in implementing functionality such as closing a dropdown menu when the user clicks outside of it. 
    The hook takes a boolean value isVisisble as an argument, which represents the initial visibility state of the element.
*/

/* Usage: 
    ref should be attached to the component we want to be closed when click is registered somewhere outside.
    isVisible controls whether component should be visible initially.
    
*/
import { useEffect, useRef, useState } from "react";

export const useClickOutside = isVisisble => {
    const [isShow, setIsShow] = useState(isVisisble);

    // This ref will be used to store a reference to the element that needs to be detected for clicks outside.
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        // checks if the ref.current (the referenced element) exists 
        // and if the clicked target is not inside that element.
        if (ref.current && !ref.current.contains(event.target)) {
            // The click happened outside the specified element.
            setIsShow(false);
        }
    };

    useEffect(() => {
        // add an event listener to the click event on the document. 
        // When a click event occurs, the handleClickOutside function is invoked. 
        // This allows the hook to detect clicks happening anywhere on the page.
        document.addEventListener("click", handleClickOutside);
        // Ensures that the event listener is removed when the component unmounts, preventing memory leaks.
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isShow]);

    return { ref, isShow, setIsShow };
};

// How to use this hook:

/*
    In this example, the ref can be assigned to the element that needs to be detected for clicks outside. 
    The isShow variable represents the visibility state of the element, 
    and setIsShow is used to update the visibility state. 
    The hook will handle the click events and update the isShow value accordingly.
*/

/*
import React from "react";
import { useClickOutside } from "./useClickOutside";

const ExampleComponent = () => {
  const { ref, isShow, setIsShow } = useClickOutside(true);

  // Rest of the component logic...
};
*/
