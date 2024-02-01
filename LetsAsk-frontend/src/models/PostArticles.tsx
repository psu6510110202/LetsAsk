export default interface PostArticle {
    data: {
        Topic: string,
        Description: string,
        Creator: string,
        TotalComment: number,
        AvatarCreator: string,
        Tags: string
    }
}