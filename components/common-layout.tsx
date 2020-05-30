import Head from "next/head";
import React, {SyntheticEvent} from "react";
import {Nav, Navbar} from "react-bootstrap";
import Config from "../resources/site-config.json";
import {NextRouter} from "next/router";
import NavigationBar from "./navigation-bar";

class CommonLayoutProps {
    router: NextRouter
    title?: string
    children: any
}

export default class CommonLayout extends React.Component<CommonLayoutProps, any> {
    render() {
        let title: string
        if (this.props.title?.length > 0 ?? false) {
            title = Config.title_format.replace("$title", this.props.title).replace("$main_title", Config.title)
        } else {
            title = Config.title
        }

        let onSelectLink = (eventKey: string, event?: SyntheticEvent) => {
            switch (eventKey) {
                case "Posts":
                    this.props.router.push('/posts');
                    break;
            }
        }

        return (
            <div className="bg-gray-800 h-screen" style={{overflow: "scroll"}}>
                <NavigationBar router={this.props.router} title={Config.title}/>

                <Head>
                    <title>{title}</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main>
                    <div className="text-white">
                        {this.props.children}
                    </div>
                </main>
            </div>
        )
    }
}
