import {Card} from "react-bootstrap";
import React from "react";
import {PostCardStyle, RawPost} from "../models/post";
import {AspectRatioBox, Box, Heading, Image, Stack, Tag, Text} from "@chakra-ui/core";
import { useSpring, animated } from "react-spring";

function trimLength(text: string, length: number, trimmedPlaceholder: string = '...') {
    if (text.length <= length) {
        return text
    }

    text = text.substr(0, length - trimmedPlaceholder.length) + '...'
    return text
}

const PostCardBody: React.FC<{ post: RawPost }> = (props) => {
    const body: Array<JSX.Element> = [
        <Card.Title>{trimLength(props.post.title, 16)}</Card.Title>,
    ]

    if (props.post.subtitle !== undefined) {
        body.push(<Card.Subtitle>{trimLength(props.post.subtitle, 30)}</Card.Subtitle>)
    }

    body.push(
        <Card.Text>
            {props.post.headline}
        </Card.Text>
    )

    switch (props.post.style ?? PostCardStyle.default) {
        case PostCardStyle.default:
            return <Card.Body>{body}</Card.Body>
        case PostCardStyle.overlay:
            return (
                <div style={{position: 'absolute', height: '100%', width: '100%', borderRadius: 'calc(.25rem - 1px)', backgroundColor: 'rgba(0,0,0,0.7)'}}>
                    <Card.ImgOverlay>
                        <div key={props.post.permalink} style={{height: '100%', overflow: 'hidden'}}>
                            {body}
                        </div>
                    </Card.ImgOverlay>
                </div>
            )
    }
}

export const PostCardView: React.FC<{ post: RawPost, onClick?: (post: RawPost) => void }> = (props) => {
    const minScale = 18
    const minW = 16 * minScale

    const scale = 25
    const w = 16 * scale

    const [imgProps, imgSet] = useSpring(() => ({opacity: 0.95}))

    const image = (
        <Box display='flex' justifyContent='center' alignItems='center' position='absolute' w='100%' h='100%'>
            <Image src={props.post.image} position='absolute' minW='100%' minH='100%' flexShrink={0}/>
            <animated.div className='bg-gray-900' style={{ ...imgProps, width: '100%', height: '100%', zIndex: 2 }}/>
        </Box>
    )

    const tagStack = (
        <Stack direction='row'>
            {props.post.tags != null && props.post.tags.map(tag => <Tag size='sm' variantColor='gray' variant='outline' rounded='full'>{tag}</Tag>)}
        </Stack>
    )

    return (
        <AspectRatioBox className='shadow-lg' backgroundColor='gray.800' rounded='lg' overflow='hidden' maxW={w} minW={minW} ratio={16 / 9} position='relative'>
            <Box cursor='pointer' onMouseEnter={() => {
                if (props.post.image == null) {
                    return
                }

                imgSet({ opacity: 0 })
            }} onMouseLeave={() => {
                if (props.post.image == null) {
                    return
                }

                imgSet({ opacity: 0.95 })
            }} onClick={() => {
                if (props.onClick == null) {
                    return
                }

                props.onClick(props.post)
            }} w='100%' h='100%'>
                { props.post.image != null && image }
                <Stack p={5} position='absolute' zIndex={2}>
                    { props.post.tags != null && tagStack }
                    <Heading fontSize='21pt' fontWeight={400}>{props.post.title}</Heading>
                    <Text fontWeight={300} fontSize='15pt'>{props.post.headline}</Text>
                    <Text fontWeight={200} fontSize='12pt'>{props.post.subtitle}</Text>
                </Stack>
            </Box>
        </AspectRatioBox>
    )
}
