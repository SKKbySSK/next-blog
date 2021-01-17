import { Post, RawPost } from "../models/post";
import { PostCardView } from "./post-card-view";
import React from "react";
import { Box, Button, Stack } from "@chakra-ui/react";
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export const PostCardList: React.FC<{ posts: RawPost[] }> = (props) => {
    let isProduction: boolean
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        isProduction = false
    } else {
        isProduction = true
    }

    const cards = props.posts.filter(p => !isProduction || !(p.hidden ?? false)).map(p => {
        return (
            <Stack key={p.permalink}>
                <PostCardView post={p} />
                <Box height='1px' backgroundColor='gray.500' width='100%' />
            </Stack>
        )
    })

    return (
        <Box>          {cards}
            <Box>
                <Stack ml='auto' mr='auto' direction='row' pt='2em' width={['100%', '80%']} justifyContent='space-evenly' align='center'>
                    <Button variant='ghost' leftIcon={<FiArrowLeft />}>Previous</Button>
                    <Button>1</Button>
                    <Button variant='ghost' rightIcon={<FiArrowRight />}>Next</Button>
                </Stack>
            </Box>
        </Box>
    )
}