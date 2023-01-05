import {ref} from "vue";

export function useBaseTimeLineData(){
    return [
        {name: 'order', title: 'دریافت سفارش', subtitle: '1401-05-06', checked: true},
        {name: 'proforma', title: 'صدور پیش فاکتور', subtitle: '1401-05-05', checked: true},
        {name: 'income', title: 'دریافت وجه', subtitle: '1401-05-05', checked: true},
        {name: 'permit', title: 'صدور مجوز', subtitle: '1401-05-05', checked: true},
        {name: 'invOut', title: 'ارسال به مشتری', subtitle: '1401-05-05', checked: true},
        {name: 'invoice', title: 'ارسال فاکتور', subtitle: '1402-06-05', checked: true},
    ]
}

export function useBaseOrderData(){
    return []
}