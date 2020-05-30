export enum PostCardStyle {
    default = "default",
    overlay = "overlay",
}

export type RawPost = {
    title: string
    subtitle?: string | undefined
    headline: string
    image?: string | undefined
    tags?: string[]
    style?: PostCardStyle
    permalink: string
    content: string
    hidden: boolean
}

export type Post = {
    title: string
    subtitle?: string | undefined
    headline: string
    image?: string | undefined
    tags: string[]
    style: PostCardStyle
    permalink: string
    actualContent: string
    lastModifiedTimeMs: number
}
