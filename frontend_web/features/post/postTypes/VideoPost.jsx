import { useEffect, useRef, useState } from 'react';
// import { formatDistanceToNow } from 'date-fns';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
// import { faClock } from "@fortawesome/free-regular-svg-icons";
// import LikeBtn from '../postComponents/LikeBtn';
// import DislikeBtn from '../postComponents/DislikeBtn';
// import ShareBtn from '../postComponents/ShareBtn';
// import Hashtags from '../postComponents/Hashtags';
// import Username from '@/features/user/Username';
// import ProfilePic from '@/features/user/ProfilePic';
import PostOverlay from '../postComponents/PostOverlay';

export default function VideoPost({ post }) {
    const videoRef = useRef(null);
    const [isVertical, setIsVertical] = useState(null);
    const [isBlackOverlay, setIsBlackOverlay] = useState(false);

    // Check if the video is vertical or horizontal
    useEffect(() => {
        
        // Initialize the ColorThief instance for retrieving the color of the video
        //const colorThief = new ColorThief();

        if (videoRef.current) {
            const video = videoRef.current;

            video.addEventListener("loadedmetadata", () => {
                setIsVertical(video.videoWidth < video.videoHeight);
            });

            // The following code is for determining if the text on the video should be black or white,
            // depending on the color of the video
            // Add an event listener to update the text overlay color
                // video.addEventListener('loadeddata', () => {
                // const canvas = document.createElement('canvas');
                // canvas.width = video.videoWidth;
                // canvas.height = video.videoHeight;
                // const ctx = canvas.getContext('2d');
                // ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                // // Get the dominant color from the video frame
                // const dominantColor = colorThief.getColor(canvas);
                // // Calculate the luminance to determine if the overlay should be black or white
                // const luminance = 0.299 * dominantColor[0] + 0.587 * dominantColor[1] + 0.114 * dominantColor[2];

                // setIsBlackOverlay(luminance > 128); // Adjust the threshold as needed
                // });
        }
    }, []);

    //${isBlackOverlay ? 'text-white' : 'text-black'}
    
    return (
        <>
            <div 
                className={`relative my-4`} 
            >
                <PostOverlay post={post} />
                {/* Video */}
                <div className='z-20'>
                    <video 
                        ref={videoRef} 
                        width="100%"
                        height="100%"
                        preload="auto"
                        controls
                        playsInline    
                    >
                        <source src={post.file_url} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </>
    )
}
