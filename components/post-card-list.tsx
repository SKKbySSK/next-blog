import { Post, RawPost } from "../models/post";
import { PostCardView } from "./post-card-view";
import React from "react";
import { Box, Stack } from "@chakra-ui/react";

export const PostCardList: React.FC<{ posts: RawPost[], onClick?: (post: RawPost) => void }> = (props) => {
    let isProduction: boolean
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        isProduction = false
    } else {
        isProduction = true
    }

    const cards = props.posts.filter(p => !isProduction || !(p.hidden ?? false)).map(p => {
        return (
            <Box key={p.permalink}>
                <PostCardView post={p} onClick={props.onClick} />
            </Box>
        )
    })

    return (
        <Stack>
            {cards}
        </Stack>
    )
}