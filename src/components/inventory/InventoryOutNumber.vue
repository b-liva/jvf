<template>
  <div>
    <div class="container mx-auto px-4">
      <div v-if="showAlert" id="alert-1" :class="alertClass.bg" class="flex p-4 mb-4 rounded-lg " role="alert">
        <div class="ml-3 text-base font-medium " :class="alertClass.txt">{{ alertMsg }}</div>
        <button type="button"
                :class="alertClass.closeBtn"
                class="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 dark:bg-blue-200 dark:text-blue-600 dark:hover:bg-blue-300"
                data-dismiss-target="#alert-1" aria-label="Close">
          <span class="sr-only">Close</span>
          <i class="fa fa-close" @click="showAlert = false"></i>
        </button>
      </div>
      <div class="columns-1">
        <input v-model="number" class="border-b-2 border-green-400" v-on:keyup.enter="cr">
        <spinner v-if="mutLoading"></spinner>
        <button v-else @click="cr" class="">
          <i class="fa fa-plus text-green-400 px-4"></i>
        </button>
      </div>
      <div class="columns-1">
        <ul>
          <li v-for="io in invOuts" :key="io.id">{{ io.node.number }}
            <i class="fa fa-trash text-red-400 px-4" @click="deleteInvOutFn(io.node.id)"></i>
          </li>
          <li>
            <Spinner v-if="loading" size="8"></Spinner>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {InventoryOutNumberQuery} from '../../graphql/query/inventory/inventory.graphql';
import {createInvOutNum, deleteInvOutNumMut} from '../../graphql/query/inventory/mutations/inventory.graphql';
import {useQuery, useMutation} from "@vue/apollo-composable";
import {computed} from "vue";
import {Spinner} from 'flowbite-vue';

export default {
  name: "InventoryOutNumber",
  data() {
    return {
      number: '',
      showAlert: false,
      alertMsg: '',
      alertClass: '',
      alertClassSuccess: {
        bg: 'bg-blue-100 dark:bg-blue-200',
        txt: 'text-blue-700 dark:text-blue-800',
        closeBtn: 'bg-blue-100 text-blue-500'
      },
      alertClassError: {
        bg: 'bg-red-100 dark:bg-red-200',
        txt: 'text-red-700 dark:text-red-800',
        closeBtn: 'bg-red-100 text-red-500'
      }
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
    const {
      mutate: deleteInvOut,
      loading: deleteLoading,
      onDone: deleteInvOutOnDone,
      onError: deleteInvOutOnError
    } = useMutation(deleteInvOutNumMut)
    return {
      loading,
      invOuts,
      getInvs,
      createInvOut,
      mutLoading,
      onDone,
      deleteInvOut,
      deleteLoading,
      deleteInvOutOnDone,
      deleteInvOutOnError
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
        this.alertMsg = 'شماره خروجی انبار اضافه شد.'
        this.showAlert = true
        this.alertClass = this.alertClassSuccess
      })
    },
    deleteInvOutFn(id) {
      this.deleteInvOut({
        invOutId: id
      })
      this.deleteInvOutOnDone(() => {
        this.getInvs();
        this.alertMsg = 'شماره خروجی انبار با موفقیت حذف شد.'
        this.showAlert = true
        this.alertClass = this.alertClassSuccess
      })
      this.deleteInvOutOnError(() => {
        this.alertMsg = 'خطا'
        this.showAlert = true
        this.alertClass = this.alertClassError
      })
    }
  }
}
</script>

<style scoped>
@import url("../../assets/index.css");

</style>
