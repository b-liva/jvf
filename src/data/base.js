import {ref} from "vue";

export function useBaseTimeLineData(){
    return [
        {name: 'order', title: 'دریافت سفارش', subtitle: '1401-05-06', checked: true},
        {name: 'proforma', title: 'صدور پیش فاکتور', subtitle: '1401-05-05', checked: true},
        {name: 'income', title: 'دریافت وجه', subtitle: '1401-05-05', checked: true},
        {name: 'permit', title: 'صدور مجوز', subtitle: '1401-05-05', checked: true},
        {name: 'invIn', title: 'ورود به انبار', subtitle: '1401-05-05', checked: true},
        {name: 'invOut', title: 'خروج از انبار', subtitle: '1401-05-05', checked: true},
        {name: 'invoice', title: 'ارسال فاکتور', subtitle: '1402-06-05', checked: true},
    ]
}

export function useBaseOrderData(){
    return []
}

export function useBaseProformaData(){
    return ref([
        {code: 1010025, type: 'روتین', qty: 2, kw: 55, rpm: 1500, voltage: 380, im: "IMB3", ic: "IC411", ip: "IP55", ie: "IE1", price: 2000000, show: false},
        {code: 1010026, type: 'روتین', qty: 1, kw: 75, rpm: 300, voltage: 380, im: "IMB3", ic: "IC411", ip: "IP55", ie: "IE1", price: 2000000, show: false},
        {code: 1010027, type: 'روتین', qty: 3, kw: 110, rpm: 1000, voltage: 380, im: "IMB3", ic: "IC411", ip: "IP55", ie: "IE1", price: 2000000, show: false},
        {code: 1010028, type: 'روتین', qty: 1, kw: 132, rpm: 1500, voltage: 380, im: "IMB3", ic: "IC411", ip: "IP55", ie: "IE1", price: 2000000, show: false},
    ])
}

export function useBasePermitData(){
    return ref([
        {code: 1010025, type: 'روتین', qty: 2, delivered: 1, kw: 55, rpm: 1500, voltage: 380, im: "IMB3", ic: "IC411", ip: "IP55", ie: "IE1", show: false},
        {code: 1010026, type: 'روتین', qty: 1, delivered: 1, kw: 75, rpm: 300, voltage: 380, im: "IMB3", ic: "IC411", ip: "IP55", ie: "IE1", show: false},
        {code: 1010027, type: 'روتین', qty: 3, delivered: 1, kw: 110, rpm: 1000, voltage: 380, im: "IMB3", ic: "IC411", ip: "IP55", ie: "IE1", show: false},
        {code: 1010028, type: 'روتین', qty: 1, delivered: 1, kw: 132, rpm: 1500, voltage: 380, im: "IMB3", ic: "IC411", ip: "IP55", ie: "IE1", show: false},
    ])
}