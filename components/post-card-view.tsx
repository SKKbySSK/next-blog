import React, { useState } from "react";
import { RawPost } from "../models/post";
import { Box, Image, Link, Stack, Tag, Text, useColorModeValue } from "@chakra-ui/react";
import { useSpring, animated } from "react-spring";

function trimLength(text: string, length: number, trimmedPlaceholder: string = '...') {
    if (text.length <= length) {
        return text
    }

    text = text.substr(0, length - trimmedPlaceholder.length) + '...'
    return text
}

export const PostCardView: React.FC<{ post: RawPost }> = (props) => {
    return (
        <Link href={'/posts/' + props.post.permalink} passHref style={{ textDecoration: 'none' }}>
            <PostCardViewRef post={props.post} />
        </Link>
    )
}

const PostCardViewRef = React.forwardRef((props: { post: RawPost, onClick?: any, href?: string }, ref: any) => {
    const tagStack = (
        <Stack direction='row'>
            {props.post.tags != null && props.post.tags.map(tag => <Tag key={tag} size='sm' colorScheme='gray' variant='outline' rounded='full'>{tag}</Tag>)}
        </Stack>
    )

    const bgColor = useColorModeValue('teal.50', 'teal.900')

    return (
        <Box cursor='pointer'>
            <Stack as='a' href={props.href} onClick={props.onClick} ref={ref} p='1em'>
                <Text fontSize='1.5em' fontWeight={400}>{props.post.title}</Text>
                <Text fontWeight={200} fontSize='1em'>{props.post.subtitle}</Text>
            </Stack>
        </Box>
    )
})
