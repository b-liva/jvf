<template>
  <div>
    <p v-if="loading">loading</p>
    <div class="canvas"></div>
  </div>
</template>

<script>
import {customersQuery} from '../../graphql/query/customer/customer.graphql';
import {useQuery} from '@vue/apollo-composable';
import {computed} from "vue";
import * as d3 from "d3";
import {Treemap} from "../../utils/d3/treemap";

export default {
  name: "customerTreeMap",
  data() {
    return {
      customers: null,
    }
  },
  setup(props) {
    const {result: customersRes, error, loading} = useQuery(customersQuery, {
      agent: true
    })
    const customers = computed(() => customersRes.value?.allCustomers.edges ?? {})
    return {
      customers,
      loading
    }
  },
  watch: {
    customers() {
      const chart = Treemap(this.prepare(this.customers), {
        path: d => d.name.replace(/\./g, "/"), // e.g., "flare/animate/Easing"
        value: d => d?.size, // size of each node (file); null for internal nodes (folders)
        group: d => d.name.split(".")[1], // e.g., "animate" in "flare.animate.Easing"; for color
        label: (d, n) => [...d.name.split(".").pop().split(/(?=[A-Z][a-z])/g), n.value.toLocaleString("en")].join("\n"),
        title: (d, n) => `${d.name}\n${n.value.toLocaleString("en")}`, // text to show on hover
        // link: (d, n) => `${urls.customerDetailsUrl(n.data.id)}`,
        tile: d3.treemapBinary, // e.g., d3.treemapBinary; set by input above
        width: 1152,
        height: 1152,
      });
      console.log(chart)
    }
  },
  methods: {
    prepare(customers) {
      const baseData = [
        {
          'name': 'agent',
          'id': null,
          'size': null
        }, {
          'name': 'nonAgent',
          'id': null,
          'size': null
        }
      ]
      let newData = customers.map(d => {
        return {'name': `agent.${d.node.name}`, 'id': d.node.id, 'size': d.node.salesAmount}
      });
      return baseData.concat(newData)
    }
  }
}
</script>

<style scoped>
@import url("../../assets/index.css");

</style>
