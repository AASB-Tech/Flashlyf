"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import { useIsClient } from '@/shared/providers/IsClientCtxProvider';
import Button from "@/shared/components/Button";
import hashtagFormatter from "@/shared/utils/hashtagsFormatter";
import FileUploader from "./fileUpload/FileUploader";
import api from "@/clientAPI/api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark as faCircleXmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { faCircleXmark as faCircleXmarkSolid } from "@fortawesome/free-solid-svg-icons";
import PopUpDiscardPost from "./PopUpDiscardPost";
import ProfilePic from "@/features/user/ProfilePic";
import Username from "@/features/user/Username";

export default function CreatePost() {
    const router = useRouter()
    const isClient = useIsClient();

    const [textInput, setTextInput] = useState("");
    // Raw hashtag input (will be converted to array when send to server)
    const [hashtagInput, setHashtagInput] = useState("");
    // Shows user which hashtags are included in the post
    const [hashtagPreview, setHashtagPreview] = useState("");
    // The actual hashtags send to the server.
    const [hashtags, setHashtags] = useState([]);
    const [file, setFile] = useState(null);
    // For post discard mechanics
    const [isHovered, setIsHovered] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const [discardAnswer, setDiscardAnswer] = useState(false);
    const [message, setMessage] = useState("");

    // Create post logic
    async function handleSubmit(e) {
        e.preventDefault();
        const postData = {
            text_content: textInput,
            hashtags: hashtags,
            scheduled_time: null
        }
        const response = await api.createPost(postData, file);
        if (response.success === true) {
            router.push("/home")
        }
        else {
            setMessage(response.message);
        }
    }

    const handleChange = (e) => {
        //get the text content
        if (e.target.name === "text_content") {
            setTextInput(e.target.value);
            // setPostData({
            //     ...postData,
            //     [e.target.name]: e.target.value
            // });
        }
        //get the hashtags
        else if (e.target.name === "hashtags") {
            setHashtagInput(e.target.value);
            //Only 3 hashtags per post.
            const hashtagsArray = hashtagFormatter(e.target.value, 3);
            setHashtags(hashtagsArray);
            // Add a '#' character in front of each hashtag for the preview
            const hashtagsString = "#" + hashtagsArray.join(" #");
            setHashtagPreview(hashtagsString);
            // setPostData({
            //     ...postData,
            //     [e.target.name]: hashtagsArray
            // });
        }
    };

    const togglePopUp = () => {
        if (textInput != "" || hashtagInput != "" || file != null) {
            setShowPopUp(true)
        }
        else {
            setTextInput("");
            setHashtagInput("");
            setHashtagPreview("");
            setFile(null);
            //router.back()
            router.push("/home")
        }
    };

    const handleDiscardPost = (answer) => {
        if (answer === true) {
            setTextInput("");
            setHashtagInput("");
            setHashtagPreview("");
            setFile(null);
            //router.back()
            router.push("/home")
        }
        else if (answer === false) {
            setShowPopUp(false)
        }
    }

    const toggleHover = () => {
        setIsHovered(!isHovered);
    };

    return (
        <>
            {showPopUp ? <PopUpDiscardPost  handleAnswer={handleDiscardPost} />
            : null}
            <div className="flex flex-row m-2">
                <ProfilePic
                    userID={isClient ? window.localStorage.getItem('loggedInUserID') : "12345"}
                    classes="m2"
                    width="30"
                    height="30"
                />
                <Username 
                    username={isClient ? window.localStorage.getItem('loggedInUsername') : "username"}
                    classes="m2"
                />
                {/* Discard button */}
                <button
                    className="absolute top-0 right-0 mt-2 mr-2"
                >
                    <FontAwesomeIcon 
                        icon={isHovered ? faCircleXmarkSolid : faCircleXmarkRegular} 
                        onMouseEnter={toggleHover}
                        onMouseLeave={toggleHover}
                        onClick={togglePopUp}
                        fontSize="30px"
                        style={{color: "#000000",}}
                    />
                </button>
                {/* Discard button END */}
            </div>
            <div 
                className=""
            >
                <form
                    id="createPostForm"
                    className="w-full min-w-full max-w-full"
                    action="#"
                    onSubmit={handleSubmit}
                >
                    <textarea
                        className="w-full min-w-full max-w-full mt-6 placeholder:text-center placeholder:text-lg text-black p-2"
                        rows="5"
                        id="newPostText"
                        aria-label="Write the text for your post."
                        placeholder="What do you want to say?"
                        type="textarea"
                        spellCheck="true"
                        name="text_content"
                        value={textInput}
                        onChange={handleChange}
                    />

                    <div
                        className="relative bg-[#5250a8] w-full p-2 text-center text-white"
                        forhtml="newPostHashtags"
                    >
                        Write hashtags here:
                    </div>
                    <p 
                        className="w-full min-w-full max-w-full text-hashtagblue px-2 mb-1"
                    >
                        {hashtagPreview}
                    </p>
                    <input
                        className="w-full placeholder:text-center text-black p-2 text-hashtagblue"
                        id="newPostHashtags"
                        aria-label="Set hashtags for your post"
                        type="text"
                        placeholder="Minimum of 1 hashtag, maximum of 3 hashtags."
                        name="hashtags"
                        value={hashtagInput}
                        onChange={handleChange}
                        required
                    ></input>
                    <div
                        className="bg-[#5250a8] w-full"
                    >
                        {/* <p 
                            className="text-center text-white"
                        >
                            Click here to add a file (optional)
                        </p> */}
                        <FileUploader
                            file={file}
                            setFile={setFile}
                        />
                    </div>

                    <div
                        className="w-1/2 mx-auto my-4"
                    >
                        {message} {/* Error message */}
                        <Button
                            text="Create post"
                            link="#"
                            type="submit"
                            onclick={handleSubmit}
                            isDisabled={hashtags.length === 0 ? true : false }
                        />
                    </div>
                </form>
            </div>
        </>
    )
}
