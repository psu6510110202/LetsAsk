import conf from "../conf";
import Comments  from "../models/Comments";
import { IRepository } from "./IRepositories";

export class CommentRepository implements IRepository<Comments> {
    urlPrefix = `${conf.apiPrefix}/api/comments`

    async  getCommentByPostId(id: string | number): Promise<Comments[] | null> {
        const resp = await fetch(`${this.urlPrefix}?filters[PostContentId][$eq]=${id}`);
        const data = await resp.json();
        return data.data;
    }
}