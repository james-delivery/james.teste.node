import { PaymentEnum } from "../commons/PaymentEnum";

export const listCompenstations = [
    {   
        pagarme_recipient_id: "3232326", 
        amount: 33112.50,
        expected_payment_date:"current_timestamp",
        status: PaymentEnum.STATUS_PAID,
        order_id: "1",
    },
    {   
        pagarme_recipient_id: "3232322", 
        amount: 501100.50,
        expected_payment_date: "current_timestamp",
        status: PaymentEnum.STATUS_WAITING,
        order_id: "2",
    },
    {   
        pagarme_recipient_id: "3232323", 
        amount: 31222.50,
        expected_payment_date:"current_timestamp",
        status: PaymentEnum.STATUS_PAID,
        order_id: "3",
    },
    {   
        pagarme_recipient_id: "3232324", 
        amount: 1222.50,
        expected_payment_date:  "current_timestamp",
        status: PaymentEnum.STATUS_WAITING,
        order_id: "4",
    },
    {   
        pagarme_recipient_id: "32312223", 
        amount: 322.50,
        expected_payment_date:"current_timestamp",
        status: PaymentEnum.STATUS_WAITING,
        order_id: "5",
    },
    {   
        pagarme_recipient_id: "7777777", 
        amount: 1000.50,
        expected_payment_date:"current_timestamp",
        status: PaymentEnum.STATUS_PAID,
        order_id: "6",
    },
    {   
        pagarme_recipient_id: "2312326", 
        amount: 50200.50,
        expected_payment_date:"current_timestamp",
        status: PaymentEnum.STATUS_PAID,
        order_id: "7",
    },
    {   
        pagarme_recipient_id: "323232612", 
        amount: 5000.50,
        expected_payment_date:"current_timestamp",
        status: PaymentEnum.STATUS_PAID,
        order_id: "8",
    }
];   