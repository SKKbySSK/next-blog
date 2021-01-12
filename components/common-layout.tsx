import Head from "next/head";
import React, { SyntheticEvent } from "react";
import Config from "../resources/site-config.json";
import { NextRouter } from "next/router";
import { Box } from "@chakra-ui/react";

class CommonLayoutProps {
    router: NextRouter
    title?: string
    description?: string
    children: any
}

export default function CommonLayout(props: CommonLayoutProps) {
    let title: string
    if (props.title?.length > 0 ?? false) {
        title = Config.titleFormat.replace("$title", props.title).replace("$main_title", Config.title)
    } else {
        title = Config.title
    }

    const metaDescription = props.description ?? Config.description;
    return (
        <Box overflow='auto'>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content={metaDescription} />
                <meta property="og:type" content="website" />
                <meta name="og:title" property="og:title" content={title} />
                <meta
                    name="og:description"
                    property="og:description"
                    content={metaDescription}
                />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={metaDescription} />
                <meta name="twitter:creator" content={Config.authorTwitter} />
                <link rel="icon" type="image/png" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/favicon.ico" />
            </Head>
            <Box margin='auto' width={'90%'} maxWidth='800pt' textColor='white'>
                {props.children}
            </Box>
        </Box>
    )
}
