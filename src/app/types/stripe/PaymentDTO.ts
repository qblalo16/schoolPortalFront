export interface PaymentDTO {
    id: string,
    brand: string,
    country: string,
    metadata: string,
    last4: string,
    customer: string | null,
    type: string
};