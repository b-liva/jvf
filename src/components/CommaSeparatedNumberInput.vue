<template>
  <money3 v-model="amount" v-bind="config"></money3> {{ amount }}
</template>

<script>

import {Money3Component} from "v-money3";

export default {
  components: { money3: Money3Component },
  data () {
    return {
      amount: '12345.67',
      config: {
        masked: false,
        prefix: '',
        suffix: '',
        thousands: ',',
        decimal: '.',
        precision: 2,
        disableNegative: false,
        disabled: false,
        min: null,
        max: null,
        allowBlank: false,
        minimumNumberOfCharacters: 0,
      }
    }
  }
}
</script>
