export interface Register{
    firstName: string;
    middleName?: string
    lastName: string;
    email: string;
    password: string;
}

export interface Login{
    email : string;
    password: string;
}