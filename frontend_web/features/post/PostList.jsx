import { useApplyPostFilters } from "@/shared/hooks/useApplyPostFilters";
import ImagePost from "./postTypes/ImagePost";
import VideoPost from "./postTypes/VideoPost";
import TextPost from "./postTypes/TextPost";
import AudioPost from "./postTypes/AudioPost";

export default function PostList({ posts }) {

    const filteredPosts = useApplyPostFilters(posts);
    console.log("filteredPosts", filteredPosts);

    return (
        <div className="post-list">
            {filteredPosts.map((post) => {
                if (post.post_type === 'image') {
                    return (
                        <ImagePost key={post.id} post={post}  />
                    );
                }
                if (post.post_type === 'video') {
                    return (
                        <VideoPost key={post.id} post={post}  />
                    );
                }
                if (post.post_type === 'text') {
                    return (
                        <TextPost key={post.id} post={post}  />
                    );
                }
                if (post.post_type === 'audio') {
                    return (
                        <AudioPost key={post.id} post={post}  />
                    );
                }
            })}
        </div>
    );
}
