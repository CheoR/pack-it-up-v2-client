import { ApolloClient } from "@apollo/client"

import { getHost } from "./getHost"
import { cache } from "./cache"
import { link } from "./link"

export const client = new ApolloClient({
  // with expo the following do not work
  // "http://localhost:4000/"
  // "exp://192.168.1.65:19000/"
  // "http://localhost:4000/graphql"
  // "exp://192.168.1.65:19000/graphql"
  uri: getHost(),
  cache,
  credentials: "include",
  defaultOptions: { watchQuery: { fetchPolicy: "cache-and-network" } },
  link,
})
