import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import LikeBtn from './LikeBtn';
import DislikeBtn from './DislikeBtn';
import ShareBtn from './ShareBtn';
import Hashtags from './Hashtags';
import Username from '@/features/user/Username';
import ProfilePic from '@/features/user/ProfilePic';

export default function PostOverlay( {post} ) {

    return (
        <>
        {/* Video overlay components */}
        <div className={`absolute top-0 left-0 right-0 ${post.post_type === 'image' ? 'bottom-0' : 'bottom-20'} `}>
            {/* Top part of overlay */}
            <div className="flex flex-row justify-between m-2">
                <div className='flex flex-row items-start z-30'> 
                <ProfilePic
                    userID={post.user_id}
                    classes="rounded-full mr-2"
                    width="30"
                    height="30"
                />
                <Username 
                    username={post.username} 
                    classes="text-white"
                />
                </div>
                <div className='items-end mr-2 z-30'>
                    <button>
                        <FontAwesomeIcon
                            icon={faEllipsis}
                            fontSize="30px"
                            style={{color: "#f8f2df"}}
                        />
                    </button>
                </div>
            </div>
            {/* Bottom part of overlay */}
            <div className='absolute left-0 right-0 bottom-0 z-30 mb-2'>
                <div className='flex flex-col justify-between items-end content-end mr-2 opacity-80'>
                    <div className='grid gap-3'>
                        <LikeBtn />
                        <ShareBtn />
                        <DislikeBtn />
                    </div>
                </div>

                <div className='ml-2 flex flex-row'>
                    <FontAwesomeIcon
                        icon={faClock}
                        fontSize="25px"
                        style={{color: "#f8f2df"}}
                    />
                    <p 
                        className='ml-2 mb-1 text-white'
                    >
                        {formatDistanceToNow(new Date(post.expires_at)).replace(/^about\s/, '')}
                    </p>
                    <Hashtags tags={post.hashtags} />
                </div>
                
                <div className='w-1/2 mx-auto mt-2 mb-4 opacity-80'>
                    <button 
                        className='bg-white text-black font-bold rounded-full py-2 px-8'
                    >
                        Write a comment
                    </button>
                </div>
                <p className='w-fit mx-auto bg-white text-black rounded-full py-2 px-8 mx-2 opacity-80'
                    >
                        <span className='font-bold'>@username</span> This is the latest comment.
                </p>
            </div>
        </div>
        </>
    )
}
