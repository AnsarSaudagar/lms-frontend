
export interface CartItems{
    slug: string;
    title: string;
    isPaid: boolean;
    price: number;
    addedAt: Date;
}

export interface Cart{
    items: CartItems[];
    total: number;
    currency: string;
}