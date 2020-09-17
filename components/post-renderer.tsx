import {Post} from "../models/post";
import React from "react";
import RemarkableReactRenderer from "remarkable-react";
import {Remarkable} from 'remarkable';
import {linkify} from 'remarkable/linkify';
import SyntaxHighlighter from "react-syntax-highlighter";
// https://github.com/conorhastings/react-syntax-highlighter/issues/230#issuecomment-568377353
import {dark} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import {Button, Card, Table} from "react-bootstrap";
import {parseTwitterUrl, TwitterData, TwitterMode, TwitterParser} from "./twitter-parser";
import path from "path";
import {blogParentDirectory, blogResourcesDirectory} from "../models/blog-constants";

function generateLink(post: Post, props: any) {
    let href = props.href as string
    href = resolveLinkForPost(post, href)

    const title = props.title ?? ''
    const titleLowerCase = title.toLowerCase()

    if (href.startsWith('https://twitter')) {
        const data = parseTwitterUrl(href)
        const keys = Array.from(data.keys())
        if (keys[TwitterData.id] !== undefined && (titleLowerCase == 'timeline' || titleLowerCase == 'follow')) {
            const mode = titleLowerCase == 'timeline' ? TwitterMode.timeline : TwitterMode.follow
            return <TwitterParser data={data} mode={mode}/>
        }
    }

    if (titleLowerCase.length > 0) {
        return (
            <Button variant="outline-light" href={href}>
                {title}
            </Button>
        )
    } else {
        // 装飾なしリンク
        return (
            <a href={href} style={{ color: 'darkorange' }}>
                {props.children}
            </a>
        )
    }
}

function resolveLinkForPost(post: Post, link: string): string {
    if (link.startsWith('http://') || link.startsWith('https://')) {
        return link
    } else {
        const directory = path.dirname(post.content)
        return `/${blogResourcesDirectory.replace(blogParentDirectory + '/', '')}/${directory}/${link}`
    }
}

const PostRenderer: React.FC<{ post: Post }> = (props) => {
    const md = new Remarkable('full', {
        typographer: true,
        breaks: true,
    });
    md.use(linkify)

    // see https://github.com/HHogg/remarkable-react#options
    md.renderer = new RemarkableReactRenderer({
        components: {
            h1: (props) => (
                <div>
                    <h1 style={{ fontSize: '28pt' }}>
                        {props.children}
                    </h1>
                    <hr style={{ backgroundColor: 'gray' }}/>
                </div>
            ),
            h2: (props) => (
                <div>
                    <h2 style={{ color: 'whitesmoke' }}>
                        {props.children}
                    </h2>
                    <hr style={{ backgroundColor: 'slategray' }}/>
                </div>
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
            hr: (props) => {
                return (
                    <hr style={{ backgroundColor: 'gray' }}/>
                )
            },
            p: (props) => {
                return (
                    <p style={{ marginTop: '1em', marginBottom: '1em' }}>
                        {props.children}
                    </p>
                )
            },
            table: (props) => {
                return (
                    <Table striped bordered hover variant='dark'>
                        {props.children}
                    </Table>
                )
            },
            img: (imgProps) => {
                return <img src={resolveLinkForPost(props.post, imgProps.src)} alt={imgProps.title}/>
            }
        }
    })

    return (
        <div>
            {md.render(props.post.actualContent)}
        </div>
    )
}

export default PostRenderer
