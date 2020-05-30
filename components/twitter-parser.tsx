import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import React from "react";

export enum TwitterData {
    id,
    tweet,
}

export enum TwitterMode {
    timeline,
    follow,
}

function getUserId(url: string) {
    const userRegex = /^https:\/\/twitter.com\/(.+)/

    const result = userRegex.exec(url)
    return result[1]
}

export function parseTwitterUrl(url: string): Map<TwitterData, string> {
    const map: Map<TwitterData, string> = new Map<TwitterData, string>()
    const id = getUserId(url)
    if (id !== undefined) {
        map.set(TwitterData.id, id)
    }

    return map
}

export const TwitterParser: React.FC<{ data: Map<TwitterData, string>, mode: TwitterMode }> = (props) => {
    if (props.data.has(TwitterData.id)) {
        switch (props.mode) {
            case TwitterMode.timeline:
                return <TwitterTimelineEmbed sourceType="profile" screenName={props.data.get(TwitterData.id)} theme='dark' options={{height: 500, width: 400}}/>
            case TwitterMode.follow:
                return <TwitterFollowButton screenName={props.data.get(TwitterData.id)} theme='dark'/>
        }
    }

    return <p style={{ color: 'red' }}>Failed to parse url</p>
}