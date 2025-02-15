import PostOverlay from '../postComponents/PostOverlay';

export default function ImagePost({ post }) {
    
    return (
        <>
            <div 
                className={`relative my-4`} 
            >
                <PostOverlay post={post} />
                <img 
                    src={post.file_url} 
                    alt="image post" 
                    width="100%"
                    height="100%"
                />
            </div>
        </>
    )
}
