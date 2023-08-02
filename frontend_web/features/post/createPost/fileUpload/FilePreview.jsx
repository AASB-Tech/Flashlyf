"use client";

import { useState, useEffect } from "react";

export default function FilePreview({ file }) {
    const [objectUrl, setObjectUrl] = useState();

    useEffect(() => {
        if (file) {
            URL.revokeObjectURL(objectUrl);
            setObjectUrl(URL.createObjectURL(file));
        }

        () => {
            if (objectUrl) {
                URL.revokeObjectUrl(objectUrl);
            }
        };
    }, [file]);

    if (!file) {
        return null;
    }

    if (file.type.includes("image")) {
        return (
            <img
                src={objectUrl}
                id="imagePreview"
                alt="Image preview"
                height="450px"
            />
        );
    }

    if (file.type.includes("video")) {
        return (
            <video
                id="videoPreview"
                height="240"
                controls
            >
                <source
                    src={objectUrl}
                    type={file.type}
                />
                Your browser does not support video previews.
            </video>
        );
    }

    if (file.type.includes("audio")) {
        return (
            <audio
                id="audioPreview"
                controls
            >
                <source
                    src={objectUrl}
                    type={file.type}
                />
                Your browser does not support audio previews.
            </audio>
        );
    }
}
