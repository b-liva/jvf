export default class Cost{
  constructor(id, cost) {
    this.id = id;
    this.chNumber = cost.chNumber;
    this.dateFa = cost.dateFa;
    this.spec = cost.spec;
    this.checkValues();

    this.costRows.forEach(item => {
      this[item] = new CostRow(cost[item]);
    })
    this.dependents.forEach(item => {
      this[item] = new DependentCost(cost[item]);
    })
  }

  costRows = [
    'aluingot',
    'castiron',
    'curotor',
    'custator',
    'insulation',
    'other',
    'overheadcost',
    'siliconsheet',
    'steel',
    'steelrebar',
    'wagecost',
  ]
  costRowSets = [
    'bearingcostSet',
    'testcostSet',
    'certificatecostSet',
  ]
  dependents = [
    'standardparts',
    'generalcost',
  ]

  replaceWith(value, replaceValue){
    return value ? value : replaceValue;
  }
  checkValues(){
    this.replaceWith(this.id, '');
    this.replaceWith(this.chNumber, '');
    this.replaceWith(this.dateFa, '');
    this.replaceWith(this.spec.id, '');
  }
}

class CostRow{
  constructor(obj) {
    for (const prop in obj){
      if (obj.hasOwnProperty(prop)){
        this[prop] = obj[prop];
      }
    }
  }
  getProps(){
    return Object.getOwnPropertyNames(this)
  }
  replaceWith(value, replaceValue){
    return value ? value : replaceValue;
  }
  checkValues(){
    this.getProps().forEach(pr => {
      this.replaceWith(pr.id, '');
      this.replaceWith(pr.qty, 0);
      this.replaceWith(pr.price, 0);
    })
  }
}

class CostRowSet extends CostRow{
  // .edges => []
  checkValues() {
    this.getProps().forEach(pr => {
      this.replaceWith(pr.node.id, '');
      this.replaceWith(pr.node.qty, 0);
      this.replaceWith(pr.node.price, 0);
      this.checkMore(pr);
    })
  }
  checkMore(pr){

  }
}

class BearingCostSet extends CostRowSet{
  checkMore(brc) {
    this.replaceWith(brc.node.bearing.id, '');
    this.replaceWith(brc.node.bearing.name, '');
  }
}

class TestCostSet extends CostRowSet{
  checkMore(tst) {
    this.replaceWith(tst.node.test.id, '');
    this.replaceWith(tst.node.test.name, '');
  }
}

class CertificateCostSet extends CostRowSet{
  checkMore(crt) {
    this.replaceWith(crt.node.certificate.id, '');
    this.replaceWith(crt.node.certificate.name, '');
  }
}

class DependentCost extends CostRow{
  checkValues(){
    this.getProps().forEach(pr => {
      this.replaceWith(pr.id, '');
      this.replaceWith(pr.amount, 0);
      this.replaceWith(pr.percent, 0);
    })
  }
}
