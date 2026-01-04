export interface Topic{
    _id: string;
    title: string;
    description: string;
    status: string;
    shortDescription: string;
    duration: number;
    image: string;
    videos : string[];
    createdAt: Date;
    updatedAt: Date;
}