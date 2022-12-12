import {ref} from "vue";

export let vMoneyConfig = ref({
  masked: false,
  prefix: '',
  suffix: '',
  thousands: ',',
  decimal: '.',
  precision: 0,
  disableNegative: true,
  disabled: true,
  min: 0,
  max: null,
  allowBlank: false,
  minimumNumberOfCharacters: 0,
})
