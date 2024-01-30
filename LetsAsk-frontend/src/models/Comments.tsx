export default interface Comments {
    id: number;
    attributes: {
        PostContentId: number;
        Description: string;
        Creator: string;
        AvatarCreator: string;
        createdAt: Date;
    }
}