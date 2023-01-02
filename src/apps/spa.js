import {createApp, h, provide} from "vue";
import {createPinia} from "pinia";
import router from "../router/routes.js";
import {DefaultApolloClient} from "@vue/apollo-composable";
import App from "../App.vue";
import {apolloClient} from "../utils/config";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

const pinia = createPinia();
app.use(pinia);
app.use(router)
app.mount("#app");
