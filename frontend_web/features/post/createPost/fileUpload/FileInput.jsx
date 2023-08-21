"use client";

import { useRef, useEffect } from "react";
import checkFileTooLarge from "@/shared/utils/checkFileTooLarge.js";
//import useToast from "../../hooks/useToast";

// function fileInputError(text) {
//     toast.error(text, {
//         position: "bottom-center",
//         autoClose: false,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light"
//     });
// }

export default function FileInput({ file, setFile, accept }) {
    const inputRef = useRef(null);
    const widthRef = useRef(null);
    //const { notifyToast, dismissToast } = useToast();

    useEffect(() => {
        if (!file) {
            inputRef.current.value = "";
        }
    }, [file]);

    const handleChooseFileClick = (e) => {
        e.preventDefault();
        inputRef.current.click();
    };

    const handleFile = (e) => {
        const eventFile = e.target.files[0];
        if (!eventFile) {
            setFile(null);
            return null;
        }
        const sizeDoesntExist = !eventFile.size;

        if (sizeDoesntExist) {
            setFile(null);
            return null;
            //return notifyToast("No file size found. Invalid file.", true);
        }

        const fileIsTooLarge = checkFileTooLarge(eventFile.size);

        if (fileIsTooLarge) {
            setFile(null);
            return null;
            //return notifyToast("File is too Large!", true);
        }

        // Check if the file is an image or a video
        if (eventFile.type.includes("image") || eventFile.type.includes("video")) {
            // Check if the file is horizontal or vertical
            const mediaElement = eventFile.type.includes("image")
                ? document.createElement("img")
                : document.createElement("video");

            mediaElement.src = URL.createObjectURL(eventFile);

            return mediaElement.onload = () => {
                // Get the width and height
                const width = mediaElement.naturalWidth;
                const height  = mediaElement.naturalHeight;
                // Remove the created element
                mediaElement.remove();
                URL.revokeObjectURL(mediaElement.src);
                // Block the file if its horizontal
                const isHorizontal = (width > height);
                if (isHorizontal) {
                    setFile(null);
                    // TODO: Make this alert better.
                    alert("Horizontal images and videos are not yet allowed on Flashlyf, but we are working on supporting horizontal content.")
                    return null;
                }
                else {
                    setFile(eventFile);
                }
            };
        }
        //setFile(eventFile);
    };

    return (
        <div className="file-input">
            <div className="file-input-mask">
                <button
                    className="w-full text-center text-white p-2"
                    onClick={handleChooseFileClick}
                >
                    Click here to add a file (optional)
                </button>
            </div>
            <input
                ref={inputRef}
                className="hidden-file-input hidden"
                type="file"
                name="file"
                accept={accept ? accept : "image/*, video/*, audio/*"}
                onInput={handleFile}
            />
        </div>
    );
}

// onClick={dismissToast}