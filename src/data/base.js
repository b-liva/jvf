import {ref} from "vue";

export function useBaseTimeLineData(){
    return ref([
        {name: 'order', title: 'دریافت سفارش', subtitle: '', checked: false},
        {name: 'proforma', title: 'صدور پیش فاکتور', subtitle: '', checked: false},
        {name: 'income', title: 'دریافت وجه', subtitle: '', checked: false},
        {name: 'permit', title: 'صدور مجوز', subtitle: '', checked: false},
        {name: 'invIn', title: 'ورود به انبار', subtitle: '', checked: false},
        {name: 'invOut', title: 'خروج از انبار', subtitle: '', checked: false},
        {name: 'invoice', title: 'صدور فاکتور', subtitle: '', checked: false},
    ])
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

export function useBaseInvInData(){
    return ref([
        {code: 1010025, serial: 140120001, qty: 2, kw: 55, rpm: 1500, voltage: 380, im: "IMB3", ic: "IC411", ip: "IP55", ie: "IE1", show: false},
        {code: 1010026, serial: 140120002, qty: 1, kw: 75, rpm: 300, voltage: 380, im: "IMB3", ic: "IC411", ip: "IP55", ie: "IE1", show: false},
        {code: 1010027, serial: 140120003, qty: 3, kw: 110, rpm: 1000, voltage: 380, im: "IMB3", ic: "IC411", ip: "IP55", ie: "IE1", show: false},
        {code: 1010028, serial: 140120004, qty: 1, kw: 132, rpm: 1500, voltage: 380, im: "IMB3", ic: "IC411", ip: "IP55", ie: "IE1", show: false},
    ])
}

export function useBaseInvOutData(){
    return ref([
        {code: 1010025, serial: 140120001, qty: 1, kw: 55, rpm: 1500, voltage: 380, im: "IMB3", ic: "IC411", ip: "IP55", ie: "IE1", show: false},
        {code: 1010026, serial: 140120002, qty: 1, kw: 75, rpm: 300, voltage: 380, im: "IMB3", ic: "IC411", ip: "IP55", ie: "IE1", show: false},
        {code: 1010027, serial: 140120003, qty: 2, kw: 110, rpm: 1000, voltage: 380, im: "IMB3", ic: "IC411", ip: "IP55", ie: "IE1", show: false},
        {code: 1010028, serial: 140120004, qty: 1, kw: 132, rpm: 1500, voltage: 380, im: "IMB3", ic: "IC411", ip: "IP55", ie: "IE1", show: false},
    ])
}

export function useBaseInvoiceData(){
    return ref([
        {code: 1010025, serial: 140120001, qty: 3, kw: 55, rpm: 1500, voltage: 380, im: "IMB3", ic: "IC411", ip: "IP55", ie: "IE1", show: false},
        {code: 1010026, serial: 140120002, qty: 1, kw: 75, rpm: 300, voltage: 380, im: "IMB3", ic: "IC411", ip: "IP55", ie: "IE1", show: false},
        {code: 1010027, serial: 140120003, qty: 2, kw: 110, rpm: 1000, voltage: 380, im: "IMB3", ic: "IC411", ip: "IP55", ie: "IE1", show: false},
        {code: 1010028, serial: 140120004, qty: 1, kw: 132, rpm: 1500, voltage: 380, im: "IMB3", ic: "IC411", ip: "IP55", ie: "IE1", show: false},
    ])
}