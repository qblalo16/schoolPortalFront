export interface Balance {
    id: number;
    registerDate: Date;
    registerDateAux: string;
    description: string;
    amount: number;
    deposit: boolean;
    lastBalance: number;
    currentBalance: number;
    transactionId: string;
    userName: string;
}