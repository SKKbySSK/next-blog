import {IncomingMessage, ServerResponse} from "http";

export default (req: IncomingMessage, res: ServerResponse) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ pages: [ { title: 'README', post: 'README.md' } ] }))
}
