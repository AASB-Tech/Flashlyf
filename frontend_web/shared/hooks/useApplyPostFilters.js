"use client"

//import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { postTypeFilterState as postTypeFilterStateRecoil, orderFilterState as orderFilterStateRecoil} from "@/shared/state/globalState";
import { filterPostType, filterExpiringPosts, filterTopPosts, filterRecentPosts} from "@/shared/utils/postFilters";

/* How to use this hook:
    import { useApplyPostFilters } from "@/shared/hooks/useApplyPostFilters";
    const filteredPosts = useApplyPostFilters(posts);
*/

export function useApplyPostFilters(posts) {

    console.log("posts inside useApply", posts);

    const [postTypeFilterState, setPostTypeFilterState] = useRecoilState(postTypeFilterStateRecoil);
    const [orderFilterState, setOrderFilterState] = useRecoilState(orderFilterStateRecoil);
    let finalPosts = []

     // All type filters = No filter
    if (postTypeFilterState.text &&
        postTypeFilterState.image && 
        postTypeFilterState.video &&
        postTypeFilterState.audio) {
        finalPosts = posts;
        console.log("finalPosts inside all filter types", finalPosts);
    }
    // Individual filters
    else {
        if (postTypeFilterState.text) {
            finalPosts = finalPosts.concat(filterPostType(posts, "text"));
        }
        if (postTypeFilterState.image) {
            finalPosts = finalPosts.concat(filterPostType(posts, "image"));
        }
        if (postTypeFilterState.video) {
            finalPosts = finalPosts.concat(filterPostType(posts, "video"));
        }
        if (postTypeFilterState.audio) {
            finalPosts = finalPosts.concat(filterPostType(posts, "audio"));
        }
    }

    // Ordering filters
    // Recent ordering is the default ordering coming from the database / API
    if (orderFilterState.recent) {
        finalPosts = filterRecentPosts(finalPosts);
        console.log("finalPosts inside recent", finalPosts);
    }
    
    else if (orderFilterState.top) {
        finalPosts = filterTopPosts(finalPosts);
        console.log("finalPosts inside top", finalPosts);
    }
    else if (orderFilterState.expiring) {
        finalPosts = filterExpiringPosts(finalPosts);
        console.log("finalPosts inside expiring", finalPosts);
    }

    console.log("finalPosts just before return", finalPosts);
    return finalPosts;
}

/*
useEffect(() => {
    // All type filters = No filter
    if (postTypeFilterState.text &&
        postTypeFilterState.image && 
        postTypeFilterState.video &&
        postTypeFilterState.audio) {
        finalPosts = posts;
        console.log("finalPosts inside all filter types", finalPosts);
    }
    // Individual filters
    else {
        if (postTypeFilterState.text) {
            finalPosts = finalPosts.concat(filterPostType(posts, "text"));
        }
        if (postTypeFilterState.image) {
            finalPosts = finalPosts.concat(filterPostType(posts, "image"));
        }
        if (postTypeFilterState.video) {
            finalPosts = finalPosts.concat(filterPostType(posts, "video"));
        }
        if (postTypeFilterState.audio) {
            finalPosts = finalPosts.concat(filterPostType(posts, "audio"));
        }
    }

    // Ordering filters
    // Recent ordering is the default ordering coming from the database / API
    if (orderFilterState.recent) {
        finalPosts = filterRecentPosts(finalPosts);
        console.log("finalPosts inside recent", finalPosts);
    }
    
    else if (orderFilterState.top) {
        finalPosts = filterTopPosts(finalPosts);
        console.log("finalPosts inside top", finalPosts);
    }
    else if (orderFilterState.expiring) {
        finalPosts = filterExpiringPosts(finalPosts);
        console.log("finalPosts inside expiring", finalPosts);
    }
}, [postTypeFilterState, orderFilterState]);
*/