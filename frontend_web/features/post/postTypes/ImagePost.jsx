
export default function ImagePost({ post }) {
    
    return (
        <>
            <div 
                className=""
            >
                <p>Image Post</p>
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
