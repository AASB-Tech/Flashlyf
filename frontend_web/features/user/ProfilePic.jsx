"use client"

import React, { useState } from "react";
import { BACKEND_URL } from "@/shared/constants/urls.js";

export default function ProfilePic({ userID, classes, width, height }) {
    const [imgSrc, setImgSrc] = useState(`${BACKEND_URL}media/avatars/${userID}.jpg`);



    // If the profile picture fails to load, use the local default avatar instead
    const handleImageError = () => {
        console.log("Profile picture failed to load");
        setImgSrc("/images/default_avatar.jpg");
    };

    return (
        <>
            <img
                className={classes}
                src={imgSrc}
                alt="Profile Picture" 
                width={width} 
                height={height}
                onError={handleImageError}
            />
        </>
    );
}
