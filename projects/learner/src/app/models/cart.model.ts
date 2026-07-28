
export interface CartItems{
    slug: string;
    title: string;
    isPaid: boolean;
    price: number;
    originalPrice?: number;
    addedAt: Date;
}

export interface Cart{
    items: CartItems[];
    total: number;
    currency: string;
    discount?: number;
}