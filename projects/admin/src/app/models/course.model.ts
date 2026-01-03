export interface Course{
    _id : string;
    title: string;
    description: string;
    status: string;
    topics: any[];
    createdAt: Date;
    updatedAt: Date;
}