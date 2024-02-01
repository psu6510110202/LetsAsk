export default interface Articles {
    id: number;
    attributes: {
        Topic: string;
        Description: string;
        Tags: string;
        TotalComment: number;
        createdAt: Date;
        Creator: string;
        AvatarCreator: string;
    }
}