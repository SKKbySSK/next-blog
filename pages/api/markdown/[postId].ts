import {IncomingMessage, ServerResponse} from "http";
import fs from 'fs'
import path from "path";
import util from "util";

export default (req: IncomingMessage & { query: { postId } }, res: ServerResponse) => {
    const id = req.query.postId
    const data = fs.readFileSync(path.resolve('public', 'blog-resources', id), 'utf8')

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end(data)
}
