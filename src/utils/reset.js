import {ref} from "vue";

export default class Reset{
    constructor() {
        this.resetting = ref(false);
    }

    getValueOrReset(getValue){
        return this.resetting.value ? [] : getValue()
    }
    reset(){
        this.resetting.value = true;
    }
}
