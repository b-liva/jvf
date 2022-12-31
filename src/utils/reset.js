import {ref} from "vue";

export default class Reset{
    constructor() {
        this.resetting = ref(false);
    }

    getValueOrReset(getValue){
        const v = getValue()
        return this.resetting.value ? v.resetValue : v.value
    }
    reset(){
        this.resetting.value = true;
    }
}
