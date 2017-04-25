export class Document {
    id: number;
    userId: number;
    type: string;
    number: string;
    date: string;
    dateOfPayment: string;
    paymentMethod: string;
    paid: boolean;
    bank: string;
    bankAccount: string;
    place: string;
    vat: number;
    netto: number;
    brutto: number;
    vatSum: number;
    notes: string;
}