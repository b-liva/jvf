import 'flowbite';
import {register} from './components/web-comp.js';
import 'vite/modulepreload-polyfill';
import {createApp, provide, h} from 'vue'

import App from './App.vue';

import HelloWorld from './components/HelloWorld.vue';
import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client/core'
import {DefaultApolloClient, provideApolloClient} from '@vue/apollo-composable'
import CustomerTreeMap from "./components/customer/customerTreeMap.vue";
// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost/ngql/',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
provideApolloClient(apolloClient)
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})
app.mount("#app");

const customerTreeMapApp = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(CustomerTreeMap)
})
customerTreeMapApp.mount("#customerApp")
