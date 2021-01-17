import CommonLayout from "../components/common-layout";
import { useRouter } from "next/router";
import React from "react";
import fs from "fs";
import { RawSite } from "../models/site";
import { PostCardList } from "../components/post-card-list";
import { NextPage } from "next";
import { blogSiteFile } from "../models/blog-constants";
import Header from "../components/header";
import Author from "../components/author";
import { Box } from "@chakra-ui/react";

const Posts: NextPage<{ site: RawSite }> = (props) => {
    const router = useRouter()

    return (
        <CommonLayout router={router}>
            <Header />
            <Box mt='1em'>
                <PostCardList posts={props.site.posts} />
            </Box>
            <Author />
        </CommonLayout>
    )
}

// fsはサーバーサイドで動作するため
// getStaticPropsでビルド時にmarkdownを取得する
export async function getStaticProps() {
    const site: RawSite = JSON.parse(fs.readFileSync(blogSiteFile, 'utf8'))
    return {
        props: {
            site: site
        }
    }
}

export default Posts
