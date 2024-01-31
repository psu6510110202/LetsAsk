import Articles from "../models/Articles";
import { IRepository } from "./IRepositories";
import conf from '../conf'
import PostArticle from "../models/PostArticles";

export class ArticleRepository implements IRepository<Articles | PostArticle> {
    urlPrefix = `${conf.apiPrefix}/api/post-contents`

    async getAll(): Promise<Articles[] | null> {
        const resp = await fetch(`${this.urlPrefix}`);
        const data = await resp.json();
        return data.data;
    }

    async getArticleById(id: string | number): Promise<Articles[] | null> {
        const resp = await fetch(`${this.urlPrefix}/${id}`);
        const data = await resp.json();
        return data.data;
    }

    async getArticleByUser(user: string): Promise<Articles[] | null> {
        const resp = await fetch(`${this.urlPrefix}?filter[Creator][$eq]=${user}`)
        const data = await resp.json()
        return data.data
    }

    async createArticle(data: PostArticle, token: string): Promise<PostArticle> {
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
}
