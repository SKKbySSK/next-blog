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

function generateLink(props: any) {
    const href = props.href as string
    let title = props.title ?? ''
    title = title.toLowerCase()

    if (href.startsWith('https://twitter')) {
        const data = parseTwitterUrl(href)
        const keys = Array.from(data.keys())
        if (keys[TwitterData.id] !== undefined && (title == 'timeline' || title == 'follow')) {
            const mode = title == 'timeline' ? TwitterMode.timeline : TwitterMode.follow
            return <TwitterParser data={data} mode={mode}/>
        }
    }

    if (title.length > 0) {
        return (
            <Button variant="outline-light" href={props.href}>
                {props.title}
            </Button>
        )
    } else {
        // 装飾なしリンク
        return (
            <a href={props.href} style={{ color: 'darkorange' }}>
                {props.children}
            </a>
        )
    }
}

const PostRenderer: React.FC<{ post: Post }> = (props) => {
    const md = new Remarkable('full', {
        html: true,
        typographer: true
    });
    md.use(linkify)

    // see https://github.com/HHogg/remarkable-react#options
    md.renderer = new RemarkableReactRenderer({
        components: {
            a: generateLink,
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
            table: (props) => {
                return (
                    <Table striped bordered hover variant='dark'>
                        {props.children}
                    </Table>
                )
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
