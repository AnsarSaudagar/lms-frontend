export interface Category{
    _id: string;
    name: string;
    slug: string;
    status: string;
    difficutyLevel: string;
    description: string;
    isActive: boolean;
    icon: string;
    coursesCount : number;
    createdAt: Date;
    updatedAt: Date;
}