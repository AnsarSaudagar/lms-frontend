
export interface CartItem{
    _id: string;
    slug: string;
    title: string;
    isPaid: boolean;
    price: number;
    originalPrice?: number;
    addedAt: Date;
}

export interface Cart{
    items: CartItem[];
    total: number;
    currency: string;
    discount?: number;
}