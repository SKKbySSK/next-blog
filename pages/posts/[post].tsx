import {NextPage} from "next";
import {RawSite} from "../../models/site";
import fs from "fs";
import {useRouter} from "next/router";
import CommonLayout from "../../components/common-layout";
import React from "react";
import {Post, PostCardStyle, RawPost} from "../../models/post";
import PostRenderer from "../../components/post-renderer";

const PostPage: NextPage<{ post: Post }> = (props) => {
    const router = useRouter()
    const modified = new Date(props.post.lastModifiedTimeMs)

    return (
        <CommonLayout router={router} title={props.post.title}>
            <div className='d-flex justify-content-center'>
                <div className='d-flex flex-column bg-gray-900 p-3' style={{ marginLeft: '4em', marginRight: '4em', paddingLeft: '6em', paddingRight: '6em', paddingTop: '2em', paddingBottom: '2em', maxWidth: '1700px' }}>
                    <PostRenderer post={props.post}/>
                    <hr/>
                    <div className='text-right text-gray-400 font-italic'>
                        <p>{`Last Modified : ${modified.toLocaleString('ja-JP')}`}</p>
                    </div>
                </div>
            </div>
        </CommonLayout>
    )
}

// 最初に実行される。事前ビルドするパスを配列でreturnする。
export async function getStaticPaths() {
    const site: RawSite = JSON.parse(fs.readFileSync('resources/blog-resources/site.json', 'utf8'))
    const paths = site.posts.map((p) => `/posts/${p.permalink}`)
    return { paths, fallback: false }
}

function convertRawToManagedPost(post: RawPost): Post {
    const file = `resources/blog-resources/${post.content}`
    const content = fs.readFileSync(file, 'utf8')
    const stat = fs.statSync(file)

    return {
        ...post,
        style: post.style ?? PostCardStyle.default,
        tags: post.tags ?? [],
        actualContent: content,
        lastModifiedTimeMs: stat.mtimeMs,
    }
}

// fsはサーバーサイドで動作するため
// getStaticPropsでビルド時にmarkdownを取得する
export async function getStaticProps({ params }) {
    const site: RawSite = JSON.parse(fs.readFileSync('resources/blog-resources/site.json', 'utf8'))

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
