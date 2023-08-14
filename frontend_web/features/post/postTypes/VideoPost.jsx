import { useEffect, useRef, useState } from 'react';
import LikeBtn from '../postComponents/LikeBtn';
import DislikeBtn from '../postComponents/DislikeBtn';
import ShareBtn from '../postComponents/ShareBtn';
import Hashtags from '../postComponents/Hashtags';
import Username from '@/features/user/Username';
import ProfilePic from '@/features/user/ProfilePic';

export default function VideoPost({ post }) {
    const videoRef = useRef(null);
    const [isVertical, setIsVertical] = useState(null);

    // Check if the video is vertical or horizontal
    useEffect(() => {
        if (videoRef.current) {
            const video = videoRef.current;

            video.addEventListener("loadedmetadata", () => {
                setIsVertical(video.videoWidth < video.videoHeight);
            });
        }
    }, []);
    
    return (
        <>
            <div 
                className="relative text-black"
            >
                {/* Video overlay components */}
                <div className="absolute top-0 left-0 right-0 bottom-0">
                    
                    <ProfilePic
                        userID={post.user_id}
                        classes="m2 rounded-full"
                        width="30"
                        height="30"
                    />
                    <Username username={post.username} />
                    <LikeBtn />
                    <ShareBtn />
                    <DislikeBtn />

                    <Hashtags tags={post.hashtags} />
                    {/* Add overlay components here */}
                    {/* For example, you can use flex to arrange components */}
                    <div className="flex flex-col h-full">

                        

                    </div>
                </div>
                <div className=''>
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
                {isVertical !== null && (
                <p>{isVertical ? "Vertical Video" : "Horizontal Video"}</p>
            )}
            </div>
        </>
    )
}
