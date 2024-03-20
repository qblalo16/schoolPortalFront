export interface PaymentIntent {
    amount: number;
    currency: string;
    description: string;
    paymentMethodTypes: string[];
    paymentMethod: string;
    customer: string;
    metadata: Record<string, string>;
    payment_method_options?: any;
}