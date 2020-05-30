import {Button, Container} from "react-bootstrap";
import React from "react";
import Link from "next/link";
import {NextRouter} from "next/router";

class NavigationProps {
    title: string
    router: NextRouter
}

class NavigationState {
    width: number
}

export default class NavigationBar extends React.Component<NavigationProps, NavigationState> {
    constructor(props: NavigationProps) {
        super(props);
        this.state = {
            width: 0
        }
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions.bind(this));
    }

    updateWindowDimensions() {
        this.setState({
            width: window.innerWidth
        })
    }

    render() {
        if (this.state.width >= 500) {
            return this.renderLargeNavigationBar()
        } else {
            return this.renderSmartNavigationBar()
        }
    }

    renderLargeNavigationBar() {
        let path = this.props.router.pathname
        return (
            <Container fluid className="bg-dark space-x-5">
                {this.renderLink(this.props.title, '/', null, true, true)}
                {this.renderLink('Home', '/', path, false, true)}
                {this.renderLink('Posts', '/posts', path, false, false)}
                {this.renderLink('Apps', '/apps', path, false, false)}
                {this.renderLink('About', '/about', path, false, false)}
            </Container>
        )
    }

    renderSmartNavigationBar() {
        let path = this.props.router.pathname
        return (
            <div className="bg-dark">
                {this.renderLink(this.props.title, '/', null, true, true)}
                <div className="items-center h-10 space-x-5">
                    {this.renderLink('Home', '/', path, false, true)}
                    {this.renderLink('Posts', '/posts', path, false, false)}
                    {this.renderLink('Apps', '/apps', path, false, false)}
                    {this.renderLink('About', '/about', path, false, false)}
                </div>
            </div>
        )
    }

    renderLink(title: string, href: string, currentPath: string, logo: boolean, exact: boolean) {
        let active = exact ? currentPath == href : currentPath?.startsWith(href) ?? false
        let inactiveColor = 'text-gray-100'
        let activeColor = 'text-gray-600'
        let hoverColor = 'text-gray-500'
        let textColor = active ? activeColor : inactiveColor

        let largeFontSize = 'text-4xl'
        let normalFontSize = 'text-xl'
        let fontSize = logo ? largeFontSize : normalFontSize

        return (
            <Link href={href}>
                <a className={`font-sans font-light bg-transparent m-3 ${fontSize} align-middle hover:no-underline transition-colors duration-200 ease-in-out ${textColor} hover:${hoverColor}`}>
                    {title}
                </a>
            </Link>
        )
    }
}
