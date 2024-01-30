import { ArticleRepository } from "./ArticleRepository";
import { CommentRepository } from "./CommentRepository";

const repositories = {
    Articledata : new ArticleRepository(),
    Commentdata : new CommentRepository()
}

export default repositories;