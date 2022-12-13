export default class JNumber{
  constructor(number) {
    this.number = number;
  }
  thousandSeparate(){
    return this.number.toLocaleString();
  }
}
