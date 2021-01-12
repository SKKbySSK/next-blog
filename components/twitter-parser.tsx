import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import React from "react";

export enum TwitterData {
    userId,
    tweetId,
}

export enum TwitterMode {
    timeline = 'timeline',
    follow = 'follow',
    tweet = 'tweet',
}

function getUserId(url: string) {
    const userRegex = /^https:\/\/twitter.com\/(.+)/

    const result = userRegex.exec(url)
    return result[1]
}

function getTweetId(url: string) {
    const userRegex = /^https:\/\/twitter.com\/.+\/status\/(.+)/

    const result = userRegex.exec(url)
    return result[1]
}

export function parseTwitterUrl(url: string, mode: TwitterMode): Map<TwitterData, string> {
    const map: Map<TwitterData, string> = new Map<TwitterData, string>()

    switch (mode) {
        case TwitterMode.timeline:
        case TwitterMode.follow:
            const userId = getUserId(url)
            if (userId !== undefined) {
                map.set(TwitterData.userId, userId)
            }
            break
        case TwitterMode.tweet:
            const tweetId = getTweetId(url)
            if (tweetId !== undefined) {
                map.set(TwitterData.tweetId, tweetId)
            }
            break
    }

    return map
}

export const TwitterParser: React.FC<{ data: Map<TwitterData, string>, mode: TwitterMode }> = (props) => {
    if (props.data.has(TwitterData.userId)) {
        switch (props.mode) {
            case TwitterMode.timeline:
                return <TwitterTimelineEmbed sourceType="profile" screenName={props.data.get(TwitterData.userId)} theme='dark' options={{ height: 500, width: 400 }} />
            case TwitterMode.follow:
                return <TwitterFollowButton screenName={props.data.get(TwitterData.userId)} theme='dark' />
        }
    }

    if (props.data.has(TwitterData.tweetId)) {
        switch (props.mode) {
            case TwitterMode.tweet:
                console.log(props.data)
                return <TwitterTweetEmbed tweetId={props.data.get(TwitterData.tweetId)} theme='dark' />
        }
    }

    return <p style={{ color: 'red' }}>Failed to parse url</p>
}