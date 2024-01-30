export interface IRepository<A> {
    //Article
    getAll?() : Promise<A[] | null>;
    getArticleById?(id: string|number) : Promise<A[] | null> 

    //Comment
    getCommentByPostId?(id: string|number) : Promise<A[] | null>
    createComment?(data: A, token: string) : Promise<A>;
}