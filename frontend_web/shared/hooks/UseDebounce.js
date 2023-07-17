/*
Debouncing is a technique used to limit the frequency of a function or value update, 
ensuring that it only occurs after a certain delay has passed since the last update.

The value argument represents the value that needs to be debounced, 
and the delay argument determines the delay duration in milliseconds (default value is 100 milliseconds).
*/

import { useEffect, useState } from "react";

export const useDebounce = (value, delay = 100) => {
    const [debounced, setDebounced] = useState(value);

    // Update debounced value after delay
    useEffect(() => {
        let timeout = setTimeout(() => {
            setDebounced(value);
        }, delay);

        // Clear timeout if value changes (also on delay change or unmount)
        return () => {
            clearTimeout(timeout);
        };
    }, [value, delay]);

    // Return the debounced value
    //This value represents the most recent value after the specified delay has elapsed.
    return debounced;
};

// How to use this hook:

/*
    In this example, 
    the debouncedValue variable will hold the debounced value of inputValue after a delay of 500 milliseconds. 
    The handleChange function updates the inputValue, and the debounced value will be automatically 
    updated after the specified delay.
*/

/*
import React from "react";
import { useDebounce } from "./useDebounce";

const ExampleComponent = () => {
    const [inputValue, setInputValue] = useState("");
    const debouncedValue = useDebounce(inputValue, 500);

const handleChange = (event) => {
    setInputValue(event.target.value);
};

  // Rest of the component logic...
};
*/
