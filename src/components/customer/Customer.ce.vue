<template>
    <div>

        <spinner v-if="loading" size="12"/>

        <div v-else id="customerDetails" class="">
            <div>
                <p class="text-5xl font-bold">{{ customer.name }}</p>
                <p><i class="fa fa-calendar" aria-hidden="true"></i> {{ customer.date2 }}</p>
                <p>
                    <BIconCalendar/>
                    {{ customer.phone }}
                </p>
                <p><i class="fa fa-fax" aria-hidden="true"></i> {{ customer.fax }}</p>
                <p><i class="fa fa-envelope" aria-hidden="true"></i> {{ customer.email }}</p>
                <p><i class="fa fa-globe" aria-hidden="true"></i>
                    <a style="color: yellow;" href="{{ customer.website }}"> {{ customer.website }}</a>
                </p>
                <p><i class="fa fa-map-marker" aria-hidden="true"></i>{{ customer.addr }}</p></div>
        </div>
    </div>
</template>

<script>

    import {Spinner} from 'flowbite-vue'
    import {useQuery} from '@vue/apollo-composable';
    import {customerById} from '../../graphql/query/customer/customer.graphql';
    import {computed} from "vue";
    import {BIconPhone, BIconPhoneFill, BIconBookFill, BIconCalendar} from "bootstrap-icons-vue";

    export default {
        setup(props) {
            const {result: customerRes, error, loading} = useQuery(customerById, {
                customer_id: props.customer_id
            })
            const customer = computed(() => customerRes.value?.customerById ?? {})
            console.log("customer: ", customer)
            return {
                loading,
                customer
            }
        },
        components: {
            BIconPhone,
            BIconPhoneFill,
            BIconBookFill,
            BIconCalendar,
            Spinner
        },
        name: "Customer.ce.vue",
        props: ['customer_id']
    }
</script>

<style scoped>
    @import url("../../assets/index.css");

    #customerDetails {
        background: #247BA0;
        color: whitesmoke;
        border-radius: 5px;
    }
</style>
