
// if exclude = false then return only posts with postType
// if exclude = true then return all posts except postType
export function filterPostType(posts, postType, exclude=false) {
    if (exclude) {
        return posts.filter(post => !post.post_type === postType);
    }
    else {
        return posts.filter(post => post.post_type === postType);
    }
}

// Returns posts where expires_at is within 2 hours
export function filterExpiringPosts(posts) {
    const twoHours = 1000 * 60 * 60 * 2;
    const now = new Date();
    const twoHoursFromNow = new Date(now.getTime() + twoHours);
    return posts.filter(post => post.expires_at < twoHoursFromNow);
}

// Returns posts sorted by time_added from high to low
export function filterTopPosts(posts) {
    return posts.sort((a, b) => b.time_added - a.time_added);
}

// Returns posts sorted by created_at from from most recent to oldest
export function filterRecentPosts(posts) {
    return posts.sort((a, b) => b.created_at - a.created_at);
}
