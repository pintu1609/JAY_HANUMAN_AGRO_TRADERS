interface CreateClientPayment {
    clientId: string;
    amount: number;
    date: string;
    paymentType: string;
    chequeNumber?: string;
    accountNumber?: string;
}


interface UpdateClientPayment {
    payload:CreateClientPayment
    id:string
}

interface ClientPaymentItemParams {
    _id: string;
    amount: number;
    date: string;
    paymentType: string;
    chequeNumber?: string | null;
    accountNumber?: string | null;
}

export  {
    CreateClientPayment,
    UpdateClientPayment,
    ClientPaymentItemParams
}