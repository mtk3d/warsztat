export class OrderPosition {
    id: number;
    userId: number;
    orderId: number;
    serviceId: number;
    name: string;
    netto: number;
    brutto: number;
    vat: number;
    vatSum: number;
    employeeId: number;
    quantity: number;
    completed: boolean;
}