import { Topic } from "./topic.model";

export interface Course{
    _id : string;
    title: string;
    description: string;
    status: string;
    topics?: Topic[];
    createdAt: Date;
    updatedAt: Date;
    price: number;
    difficultyLevel: string;
    category?: string;
    duration?: number;
    topicsCount ?: number;
}