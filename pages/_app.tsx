import "./style.css";
import React, { SyntheticEvent } from 'react'
import App, { Container } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react";
import "focus-visible/dist/focus-visible"
import { theme } from "../components/theme";


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
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        )
    }
}
