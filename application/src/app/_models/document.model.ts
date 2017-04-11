export class Document {
    id: number;
    userId: number;
    type: string;
    number: string;
    date: string;
    date_of_payment: string;
    payment_method: string;
    paid: boolean;
    bank: string;
    bank_account: string;
    place: string;
    vat: number;
    netto: number;
    brutto: number;
    vat_sum: number;
    notes: string;
    created_at: string;
    updated_at: string;
}