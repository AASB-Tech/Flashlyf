"use client"

import React, { useState, useEffect } from "react";
import api from "@/clientAPI/api.js";

export default function FollowBtn() {

    [isDisabled, setIsDisabled] = useState(false);

    const handleAction = () => {
        const response = api.follow();
        if (response.success) {
            setIsDisabled(true)
        }
    };

    const checkAlreadyFollowing = () => {
        const response = api.checkFollowing();
        setIsDisabled(true)
    };

    return (
        <>
            <div>
                <button 
                    className={`${isDisabled ? 'bg-FFblue' : 'bg-inactivegrey'} rounded-full text-white font-bold border border-black w-full flex items-center justify-center text-dm py-3 text-light`}
                    onClick={handleAction}
                    disabled={isDisabled}
                >
                    <p>
                        {isDisabled ? 
                            "Following"
                        :
                            "+ Follow"
                        }
                    </p>
                </button>
            </div>
        </>
    );
}







