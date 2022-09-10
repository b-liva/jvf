<template>
  <div>
    <div>
      <Spinner v-if="loading" size="6"></Spinner>
      <ul v-else>
        {{ someVar }}
        <li v-for="io in invOuts" :key="io.id">{{ io.node.number }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import {InventoryOutNumberQuery} from '../../graphql/query/inventory/inventory.graphql';
import {useQuery} from "@vue/apollo-composable";
import {computed} from "vue";
import {Spinner} from 'flowbite-vue';

export default {
  name: "InventoryOutNumber",
  setup(props) {
    const {result: invOutsRes, error, loading} = useQuery(InventoryOutNumberQuery, {
      permitNumber: props.number
    })
    const invOuts = computed(() => invOutsRes.value?.InventoryOutNumberQuery.edges ?? {})
    return {
      loading,
      invOuts
    }
  },
  components: {
    Spinner
  },
  props: {
    number: Number,
    someVar: String,
  }
}
</script>

<style scoped>

</style>
