import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import RootNavigator from "./navigation/RootNavigator";
import SocialsIcons from "./components/SocialsIcons";

const client = new ApolloClient({
  // with expo the following do not work
  // "http://localhost:4000/"
  // "exp://192.168.1.65:19000/"
  // "http://localhost:4000/graphql"
  // "exp://192.168.1.65:19000/graphql"
  uri: "http://192.168.1.65:4000/",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
