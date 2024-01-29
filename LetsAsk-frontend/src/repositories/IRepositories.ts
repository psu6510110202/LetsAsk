export interface IRepository<A> {
    //Article
    getAll?() : Promise<A[] | null>;
    getArticleById?(id: string|number) : Promise<A[] | null> 
}