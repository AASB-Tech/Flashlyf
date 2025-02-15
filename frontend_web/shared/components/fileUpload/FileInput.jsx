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
            return;
        }

        const sizeDoesntExist = !eventFile.size;

        // if (sizeDoesntExist) {
        //     return notifyToast("No file size found. Invalid file.", true);
        // }

        const fileIsTooLarge = checkFileTooLarge(eventFile.size);

        // if (fileIsTooLarge) {
        //     return notifyToast("File is too Large!", true);
        // }

        setFile(eventFile);
    };

    return (
        <div className="file-input">
            <div className="file-input-mask">
                <button
                    className="bg-[#6b6b6b] p-[5px] rounded-[3px] text-white mr-[5px]"
                    onClick={handleChooseFileClick}
                >
                    Choose File
                </button>
                <span>{file ? file.name : "No file chosen"}</span>
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