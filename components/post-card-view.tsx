import React from "react";
import { RawPost } from "../models/post";
import { Box, Image, Link, Stack, Tag, Text } from "@chakra-ui/react";
import { useSpring, animated } from "react-spring";

function trimLength(text: string, length: number, trimmedPlaceholder: string = '...') {
    if (text.length <= length) {
        return text
    }

    text = text.substr(0, length - trimmedPlaceholder.length) + '...'
    return text
}

export const PostCardView: React.FC<{ post: RawPost, onClick?: (post: RawPost) => void }> = (props) => {
    const tagStack = (
        <Stack direction='row'>
            {props.post.tags != null && props.post.tags.map(tag => <Tag key={tag} size='sm' colorScheme='gray' variant='outline' rounded='full'>{tag}</Tag>)}
        </Stack>
    )

    return (
        <Link href={'/posts/' + props.post.permalink} style={{ textDecoration: 'none' }}>
            <Stack cursor='pointer' bgColor='gray.800' rounded='lg' shadow='lg' p='1em'>
                <Text fontSize='1.5em' fontWeight={400}>{props.post.title}</Text>
                <Text fontWeight={200} fontSize='1em'>{props.post.subtitle}</Text>
            </Stack>
        </Link>
    )
}
