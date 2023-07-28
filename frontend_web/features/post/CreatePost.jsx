"use client";

import React, { useState } from "react";
import Button from "@/shared/components/Button";
import FileUploader from "@/shared/components/fileUpload/FileUploader";
import api from "@/clientAPI/api.js";

export default function CreatePost() {

    const [textInput, setTextInput] = useState("");
    //Raw hashtag input (will be converted to array when send to server)
    const [hashtagInput, setHashtagInput] = useState("");
    //Shows user which hashtags are included in the post
    const [hashtagPreview, setHashtagPreview] = useState("");
    const [file, setFile] = useState(null);

    // Create post logic
    async function handleSubmit(e) {
        e.preventDefault();
        const response = await api.createPost(postData, file);
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
            //const hashtagsArray = hashtagFormatter(e.target.value, 3);
            //setHashtagPreview(hashtagsArray.join(" "));
            setHashtagPreview(e.target.value);
            // setPostData({
            //     ...postData,
            //     [e.target.name]: hashtagsArray
            // });
        }
    };

    return (
        <>
            <div 
                className=""
            >
                <form
                    id="createPostForm"
                    className=""
                    action="#"
                    onSubmit={handleSubmit}
                >
                    <textarea
                        className=""
                        id="newPostText"
                        aria-label="Write the text for your post."
                        type="textarea"
                        spellCheck="true"
                        name="text_content"
                        value={textInput}
                        onChange={handleChange}
                    />
                    <p>
                        {hashtagPreview}
                    </p>
                    <label
                        className=""
                        forhtml="newPostHashtags"
                    >
                        Write hashtags below:
                    </label>
                    <input
                        className=""
                        id="newPostHashtags"
                        aria-label="Set hashtags for your post"
                        type="text"
                        placeholder="Minimum of 1 hashtag, maximum of 3 hashtags."
                        name="hashtags"
                        value={hashtagInput}
                        onChange={handleChange}
                        required
                    ></input>
                    <p 
                        className=""
                    >
                        Add a file:
                    </p>
                    <FileUploader
                        file={file}
                        setFile={setFile}
                    />
                    <input
                        className=""
                        type="submit"
                        value="Post"
                    />
                    <Button
                        text="Create post"
                        link="#"
                        type="submit"
                        onclick={handleSubmit}
                    />
                </form>
            </div>
        </>
    )
}
