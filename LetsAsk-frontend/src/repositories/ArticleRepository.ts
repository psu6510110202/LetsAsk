import Articles from "../models/Articles";
import { IRepository } from "./IRepositories";
import conf from '../conf'

export class ArticleRepository implements IRepository<Articles> {
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
}
