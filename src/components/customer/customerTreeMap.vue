<template>
  <div>
    Customer treemap goes here...
    <p v-if="loading">loading</p>
    <ol>
      <li v-for="customer in customers" :key="customer.id">{{customer.node.name}} - {{customer.node.salesAmount}}</li>
    </ol>
  </div>
</template>

<script>
import {customersQuery} from '../../graphql/query/customer/customer.graphql';
import {useQuery} from '@vue/apollo-composable';
import {computed} from "vue";
import {Pagination} from "flowbite-vue";

export default {
  name: "customerTreeMap",
  components: {Pagination},
  setup(props) {
    const {result: customersRes, error, loading} = useQuery(customersQuery, {
      agent: true
    })
    console.log('customers: ', customersRes)
    const customers = computed(() => customersRes.value?.allCustomers.edges ?? {})

    console.log(customers)
    return{
      customers,
      loading
    }
  }
}
</script>

<style scoped>

</style>
