import "./style.css";
import React, {SyntheticEvent} from 'react'
import App, { Container } from 'next/app'
import {CSSReset, theme, ThemeProvider} from "@chakra-ui/core";

export default class MyApp extends App {
    static async getInitialProps({ Component, router, ctx }) {
        let pageProps = {}

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return { pageProps }
    }

    render () {
        const { Component, pageProps } = this.props
        return  (
            <div>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                    crossOrigin="anonymous"
                />
                <ThemeProvider theme={theme}>
                    <CSSReset/>
                    <Component {...pageProps} />
                </ThemeProvider>
            </div>
        )
    }
}
