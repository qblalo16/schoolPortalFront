export interface CustomerPayment {
    token: string;
    customerCreateOptions: CustomerCreateOptions;
}

export interface CustomerCreateOptions {
    description: string;
    email: string;
    metadata: any;
    name: string;
}