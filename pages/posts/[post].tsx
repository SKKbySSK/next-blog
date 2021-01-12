import { NextPage } from "next";
import { RawSite } from "../../models/site";
import fs from "fs";
import { useRouter } from "next/router";
import CommonLayout from "../../components/common-layout";
import React from "react";
import { Post, RawPost } from "../../models/post";
import PostRenderer from "../../components/post-renderer";
import { blogSiteFile } from "../../models/blog-constants";
import Header from "../../components/header";
import Config from "../../resources/site-config.json";

const PostPage: NextPage<{ post: Post }> = (props) => {
    const router = useRouter()
    const modified = new Date(props.post.lastModifiedTimeMs)

    return (
        <CommonLayout router={router} title={props.post.title} description={props.post.subtitle}>
            <Header />
            <PostRenderer post={props.post} />
        </CommonLayout>
    )
}

// 最初に実行される。事前ビルドするパスを配列でreturnする。
export async function getStaticPaths() {
    const site: RawSite = JSON.parse(fs.readFileSync(blogSiteFile, 'utf8'))
    const paths = site.posts.map((p) => `/posts/${p.permalink}`)
    return { paths, fallback: false }
}

function convertRawToManagedPost(post: RawPost): Post {
    const file = `${Config.blogResourcesDir}/${post.content}`
    const content = fs.readFileSync(file, 'utf8')
    const stat = fs.statSync(file)

    return {
        ...post,
        title: post.title ?? '',
        subtitle: post.subtitle ?? '',
        tags: post.tags ?? [],
        actualContent: content,
        lastModifiedTimeMs: stat.mtimeMs,
    }
}

// fsはサーバーサイドで動作するため
// getStaticPropsでビルド時にmarkdownを取得する
export async function getStaticProps({ params }) {
    const site: RawSite = JSON.parse(fs.readFileSync(blogSiteFile, 'utf8'))

    let matchedPost: RawPost
    for (const post of site.posts) {
        if (post.permalink === params.post) {
            matchedPost = post
        }
    }

    return {
        props: {
            post: convertRawToManagedPost(matchedPost),
        }
    }
}

export default PostPage
