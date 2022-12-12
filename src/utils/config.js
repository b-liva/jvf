// HTTP connection to the API
import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client/core";
import {provideApolloClient} from "@vue/apollo-composable";
import {baseUrl} from "./methods.js";

const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: `${baseUrl()}/ngql/`,
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
provideApolloClient(apolloClient)

export let vMoneyConfig = {
  masked: false,
  prefix: '',
  suffix: '',
  thousands: ',',
  decimal: '.',
  precision: 0,
  disableNegative: true,
  disabled: false,
  min: 0,
  max: null,
  allowBlank: false,
  minimumNumberOfCharacters: 0,
}
