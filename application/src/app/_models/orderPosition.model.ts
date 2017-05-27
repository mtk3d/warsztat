export class OrderPosition {
    id: number;
    user_id: number;
    order_id: number;
    service_id: number;
    name: string;
    netto: number;
    brutto: number;
    vat: number;
    vat_sum: number;
    employee_id: number;
    quantity: number;
    completed: boolean;
}