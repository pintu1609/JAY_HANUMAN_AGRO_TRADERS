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

export  {
    CreateClientPayment,
    UpdateClientPayment
}