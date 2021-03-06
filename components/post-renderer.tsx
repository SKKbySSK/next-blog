import { Post } from "../models/post";
import React from "react";
import RemarkableReactRenderer from "remarkable-react";
import { Remarkable } from 'remarkable';
import { linkify } from 'remarkable/linkify';
import SyntaxHighlighter from "react-syntax-highlighter";
// https://github.com/conorhastings/react-syntax-highlighter/issues/230#issuecomment-568377353
import { dark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { parseTwitterUrl, TwitterData, TwitterMode, TwitterParser } from "./twitter-parser";
import path from "path";
import Config from "../resources/site-config.json";
import { Box, Button, Heading, Link, Stack, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue } from "@chakra-ui/react";

function generateLink(post: Post, props: any) {
    let href = props.href as string
    href = resolveLinkForPost(post, href)

    const title = props.title ?? ''
    const titleLowerCase = title.toLowerCase()

    if (href.startsWith('https://twitter')) {
        const mode = titleLowerCase as TwitterMode
        const data = parseTwitterUrl(href, titleLowerCase)
        return (
            <Box p='0.2em'>
                <TwitterParser data={data} mode={mode} />
            </Box>
        )
    }

    if (titleLowerCase.length > 0) {
        return (
            <Link {...props}>
                <Button colorScheme='teal' mt='0.5em' mb='0.5em'>
                    {title}
                </Button>
            </Link >
        )
    } else {
        // 装飾なしリンク
        return (
            <Link href={props.href} style={{ color: 'darkorange' }}>
                <Box mb='1em' display='inline'>
                    {props.children}
                </Box>
            </Link>
        )
    }
}

function resolveLinkForPost(post: Post, link: string): string {
    if (link.startsWith('http://') || link.startsWith('https://')) {
        return link
    } else {
        return '/posts/' + post.permalink
    }
}

function hr(thick: boolean): React.ReactNode {
    return <Box h={thick ? '5px' : '3px'} w='100%' backgroundColor='gray.500' mb='2px' rounded='lg' />
}

const PostRenderer: React.FC<{ post: Post }> = (props) => {
    const md = new Remarkable('full', {
        typographer: true,
        breaks: true,
    });
    md.use(linkify)

    const pColor = useColorModeValue('gray.800', 'gray.200')
    const hColor = useColorModeValue('gray.900', 'gray.100')
    const blockquoteColor = useColorModeValue('gray.100', 'gray.800')
    const tBorderColor = useColorModeValue('gray.100', 'gray.600')
    const tHeadColor = useColorModeValue('#37474F05', '#37474F40')
    const tBodyColor = useColorModeValue('#37434f02', '#37434f80')

    // see https://github.com/HHogg/remarkable-react#options
    md.renderer = new RemarkableReactRenderer({
        components: {
            h1: (props) => (
                <Stack mt='0.5em' mb='0.8em'>
                    <Heading as='h1' mt='0.5em' color={hColor}>
                        {props.children}
                    </Heading>
                    {hr(true)}
                </Stack>
            ),
            h2: (props) => (
                <Stack mb='0.8em'>
                    <Heading as='h2' mt='0.5em' fontSize='1.7em' color={hColor}>
                        {props.children}
                    </Heading>
                    {hr(false)}
                </Stack>
            ),
            h3: (props) => (
                <Heading as='h3' mt='0.5em' mb='0.8em' fontSize='1.4em'>
                    {props.children}
                </Heading>
            ),
            h4: (props) => (
                <Heading as='h4' mt='0.5em' fontSize='1.2em'>
                    {props.children}
                </Heading>
            ),
            a: (aProps) => generateLink(props.post, aProps),
            pre: ({ content, params: language }) => (
                <SyntaxHighlighter language={language} style={dark}>
                    {content}
                </SyntaxHighlighter>
            ),
            ul: (props) => {
                return (
                    <ul style={{ listStyleType: 'disc', marginLeft: `${40}px` }}>
                        {props.children}
                    </ul>
                )
            },
            ol: (props) => {
                return (
                    <ol style={{ listStyleType: 'decimal', marginLeft: `${40}px` }} start={props.order}>
                        {props.children}
                    </ol>
                )
            },
            blockquote: (props) => {
                return <Box as='blockquote' bgColor={blockquoteColor} {...props} />
            },
            hr: (props) => {
                return hr(false)
            },
            p: (props) => {
                return (
                    <Box mb='1em' color={pColor}>
                        {props.children}
                    </Box>
                )
            },
            table: (props) => {
                return (
                    <Box p='1em' rounded='lg'>
                        <Table variant='simple'>
                            {props.children}
                        </Table>
                    </Box>
                )
            },
            thead: (props) => {
                return <Thead backgroundColor={tHeadColor} {...props} />
            },
            tbody: (props) => {
                return <Tbody backgroundColor={tBodyColor} {...props} />
            },
            tr: (props) => {
                return <Tr {...props} />
            },
            th: (props) => {
                return <Th textColor={pColor} borderBottom='1px' borderColor={tBorderColor} {...props} />
            },
            td: (props) => {
                return <Td {...props} borderBottom='1px' borderColor={tBorderColor} textColor={pColor} />
            },
            img: (imgProps) => {
                return <img src={resolveLinkForPost(props.post, imgProps.src)} alt={imgProps.title} />
            }
        }
    })

    return (
        <Box>
            {md.render(props.post.actualContent)}
        </Box>
    )
}

export default PostRenderer
