import "./style.css";
import React, { SyntheticEvent } from 'react'
import App, { Container } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react";

export default class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    render() {
        const { Component, pageProps } = this.props
        return (
            <div>
                <ChakraProvider>
                    <Component {...pageProps} />
                </ChakraProvider>
            </div>
        )
    }
}
