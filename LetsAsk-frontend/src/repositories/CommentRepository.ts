import conf from "../conf";
import Comments  from "../models/Comments";
import Postcomment from "../models/PostComments";
import { IRepository } from "./IRepositories";

export class CommentRepository implements IRepository<Comments | Postcomment> {
    urlPrefix = `${conf.apiPrefix}/api/comments`

    async  getCommentByPostId(id: string | number): Promise<Comments[] | null> {
        const resp = await fetch(`${this.urlPrefix}?filters[PostContentId][$eq]=${id}`);
        const data = await resp.json();
        return data.data;
    }

     async createComment(data: Postcomment, token: string): Promise<Postcomment> {
        const resp = await fetch(`${this.urlPrefix}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const data_res = await resp.json()
        return data_res;
    }

    async getCommentByUser(user: string): Promise<Comments[] | null> {
        const resp = await fetch(`${this.urlPrefix}?filters[Creator][$eq]=${user}`)
        const data = await resp.json()
        return data.data
    }

    async  deleteCommentById(id: string | number, token: string): Promise<void> {
        const resp = await fetch(`${this.urlPrefix}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        const data = await resp.json()
        return data.data;
    }
}