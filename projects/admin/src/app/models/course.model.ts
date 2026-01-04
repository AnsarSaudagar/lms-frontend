import { Topic } from "./topic.model";

export interface Course{
    _id : string;
    title: string;
    description: string;
    status: string;
    topics: Topic[];
    createdAt: Date;
    updatedAt: Date;
}