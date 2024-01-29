export interface IRepository<A> {
    //Article
    getAll?() : Promise<A[] | null>;
}