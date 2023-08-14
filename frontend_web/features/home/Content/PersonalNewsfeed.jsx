"use client"

import { useQuery } from '@tanstack/react-query';
import api from "@/clientAPI/api.js";
import PostList from "@/features/post/PostList";

export default function PersonalNewsfeed() {

    const { status, isLoading, isError, data, error, refetch } = useQuery(["userNotes"], 
    async () => {return await api.getPersonalNewsFeed()},
    {   
        enabled: true,
        refetchOnWindowFocus: false
    }
    );

    if (isLoading) {
        return (<h1>Retrieving posts...</h1>);
    }

    if (isError) {
        return (<h1>{error}</h1>);
    }

    if (data.data == null) {
        return (<h1>No posts found</h1>);
    }

    if (data) {
        console.log("data: ", data);
        console.log("data.data: ", data.data);
    }

    return (
        <div>
            <h1>Personal News Feed</h1>
            <PostList posts={data.data} />
        </div>
    )
}
