import {Post, RawPost} from "../models/post";
import {PostCardView} from "./post-card-view";
import React from "react";

export const PostCardList: React.FC<{ posts: RawPost[], onClick?: (post: RawPost) => void }> = (props) => {
    let isProduction: boolean
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        isProduction = false
    } else {
        isProduction = true
    }

    const cards = props.posts.filter(p => !isProduction || !(p.hidden ?? false)).map(p => {
        return (
            <div key={p.permalink} className='m-1' style={{ width: '25em'}}>
                <PostCardView post={p} onClick={props.onClick}/>
            </div>
        )
    })

    return (
        <div className='d-flex flex-wrap justify-content-center align-items-center'>
            {cards}
        </div>
    )
}