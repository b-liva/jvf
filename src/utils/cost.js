export default class Cost {
    constructor(id, cost) {
        this.id = id;
        this.chNumber = cost.chNumber;
        this.dateFa = cost.dateFa;
        this.spec = cost.spec;
        this.checkValues();
        this.createCostRows(cost);
    }

    costRows = [
        { name: 'aluingot', factoryClass: CostRow },
        { name: 'castiron', factoryClass: CostRow },
        { name: 'curotor', factoryClass: CostRow },
        { name: 'custator', factoryClass: CostRow },
        { name: 'insulation', factoryClass: CostRow },
        { name: 'other', factoryClass: CostRow },
        { name: 'overheadcost', factoryClass: CostRow },
        { name: 'siliconsheet', factoryClass: CostRow },
        { name: 'steel', factoryClass: CostRow },
        { name: 'steelrebar', factoryClass: CostRow },
        { name: 'wagecost', factoryClass: CostRow },
        { name: 'bearingcostSet', factoryClass: BearingCostSet },
        { name: 'testcostSet', factoryClass: TestCostSet },
        { name: 'certificatecostSet', factoryClass: CertificateCostSet },
        { name: 'standardparts', factoryClass: DependentCost },
        { name: 'generalcost', factoryClass: DependentCost },
    ]

    createCostRows(cost) {
        this.costRows.forEach(item => {
            this[item.name] = new item.factoryClass(cost[item.name]);
        })
    }

    replaceWith(value, replaceValue) {
        return value ? value : replaceValue;
    }

    checkValues() {
        this.replaceWith(this.id, '');
        this.replaceWith(this.chNumber, '');
        this.replaceWith(this.dateFa, '');
        this.replaceWith(this.spec.id, '');
    }
    static copy(obj){
        return JSON.parse(JSON.stringify(obj))
    }
    static reset(){
        return new Cost('', Cost.copy(emptyCost))
    }
}

class CostRow {
    constructor(obj) {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                this[prop] = obj[prop];
            }
        }
    }

    getProps() {
        return Object.getOwnPropertyNames(this)
    }

    replaceWith(value, replaceValue) {
        return value ? value : replaceValue;
    }

    checkValues() {
        this.getProps().forEach(pr => {
            this.replaceWith(pr.id, '');
            this.replaceWith(pr.qty, 0);
            this.replaceWith(pr.price, 0);
        })
    }
}

class CostRowSet extends CostRow {
    // .edges => []
    checkValues() {
        this.getProps().forEach(pr => {
            this.replaceWith(pr.node.id, '');
            this.replaceWith(pr.node.qty, 0);
            this.replaceWith(pr.node.price, 0);
            this.checkMore(pr);
        })
    }

    checkMore(pr) {

    }
}

class BearingCostSet extends CostRowSet {
    checkMore(brc) {
        this.replaceWith(brc.node.bearing.id, '');
        this.replaceWith(brc.node.bearing.name, '');
    }
}

class TestCostSet extends CostRowSet {
    checkMore(tst) {
        this.replaceWith(tst.node.test.id, '');
        this.replaceWith(tst.node.test.name, '');
    }
}

class CertificateCostSet extends CostRowSet {
    checkMore(crt) {
        this.replaceWith(crt.node.certificate.id, '');
        this.replaceWith(crt.node.certificate.name, '');
    }
}

class DependentCost extends CostRow {
    checkValues() {
        this.getProps().forEach(pr => {
            this.replaceWith(pr.id, '');
            this.replaceWith(pr.amount, 0);
            this.replaceWith(pr.percent, 0);
        })
    }
}

const emptyCost = {
    id: '',
    chNumber: '',
    dateFa: '',
    spec: {id:''},
    aluingot: {id: '', qty: 0, price: 0},
    castiron: {id: '', qty: 0, price: 0},
    curotor: {id: '', qty: 0, price: 0},
    custator: {id: '', qty: 0, price: 0},
    insulation: {id: '', qty: 0, price: 0},
    other: {id: '', qty: 0, price: 0},
    overheadcost: {id: '', qty: 0, price: 0},
    siliconsheet: {id: '', qty: 0, price: 0},
    steel: {id: '', qty: 0, price: 0},
    steelrebar: {id: '', qty: 0, price: 0},
    wagecost: {id: '', qty: 0, price: 0},
    standardparts: {id: '', percent: 12, amount: 0},
    generalcost: {id: '', percent: 15, amount: 0},
    bearingcostSet: {edges: [{node: {id: '', qty: 0, price: 0, bearing: {id: '', name: ''}}}]},
    testcostSet: {edges: [{node: {id: '', qty: 0, price: 0, test: {id: '', name: ''}}}]},
    certificatecostSet: {edges: [{node: {id: '', qty: 0, price: 0, certificate: {id: '', name: ''}}}]}
}