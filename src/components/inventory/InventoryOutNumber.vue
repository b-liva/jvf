<template>
  <div>
    <div class="container mx-auto px-4">
      <div class="columns-1">
        <input v-model="number" class="border-b-2 border-green-400">
        <spinner v-if="mutLoading"></spinner>
        <button v-else @click="cr" class="">
          <i class="fa fa-plus text-green-400 px-4"></i>
        </button>
      </div>
      <div class="columns-1">
        <ul>
          <li v-for="io in invOuts" :key="io.id">{{ io.node.number }}</li>
          <li><Spinner v-if="loading" size="8"></Spinner></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {InventoryOutNumberQuery} from '../../graphql/query/inventory/inventory.graphql';
import {createInvOutNum} from '../../graphql/query/inventory/mutations/inventory.graphql';
import {useQuery, useMutation} from "@vue/apollo-composable";
import {computed} from "vue";
import {Spinner} from 'flowbite-vue';

export default {
  name: "InventoryOutNumber",
  data() {
    return {
      number: ''
    }
  },
  setup(props) {
    const {result: invOutsRes, error, loading, refetch: getInvs} = useQuery(InventoryOutNumberQuery, {
      permitNumber: props.permit
    })
    const invOuts = computed(() => invOutsRes.value?.InventoryOutNumberQuery.edges ?? {})

    const {mutate: createInvOut, loading: mutLoading, onDone, onError} = useMutation(createInvOutNum)
    onError(er => {
      console.log("error: ", er)
    })
    return {
      loading,
      invOuts,
      getInvs,
      createInvOut,
      mutLoading,
      onDone
    }
  },
  components: {
    Spinner
  },
  props: {
    permit: Number,
    permit_pk: Number,
    owner: Number,
  },
  methods: {
    cr() {
      this.createInvOut(({
        permitPk: this.permit_pk,
        owner: this.owner,
        number: this.number
      }))
      this.onDone(() => {
        this.getInvs();
        this.number = '';
      })
    }
  }
}
</script>

<style scoped>
@import url("../../assets/index.css");

</style>
