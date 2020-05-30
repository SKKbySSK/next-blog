import {Card} from "react-bootstrap";
import React from "react";
import {PostCardStyle, RawPost} from "../models/post";

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
    return (
        <div className='overflow-hidden' style={{ cursor: 'pointer' }} onClick={() => {
            if (props.onClick !== undefined) {
                props.onClick(props.post)
            }
        }}>
            <Card bg='dark'>
                {props.post.image !== undefined && <Card.Img src={props.post.image}/>}
                <PostCardBody post={props.post}/>
            </Card>
        </div>
    )
}
