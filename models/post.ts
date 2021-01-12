export type RawPost = {
    title?: string
    subtitle?: string | undefined
    tags?: string[]
    permalink: string
    content: string
    hidden?: boolean
}

export type Post = {
    title: string
    subtitle?: string | undefined
    tags: string[]
    permalink: string
    content: string
    actualContent: string
    lastModifiedTimeMs: number
}
