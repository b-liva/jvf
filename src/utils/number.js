export default class JNumber{
  constructor(number) {
    console.log(typeof number, number);
    if (typeof number === 'string'){
      number = parseFloat(number);
    }
    this.number = number;
  }
  thousandSeparate(){
    return this.number.toLocaleString();
  }
}
