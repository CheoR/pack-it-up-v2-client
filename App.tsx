import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import RegisterScreen from "./screens/Register";
import LandingScreen from "./screens/Landing";
import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";

import ROUTES from "./constants/Routes";

const client = new ApolloClient({
  // with expo the following do not work
  // "http://localhost:4000/"
  // "exp://192.168.1.65:19000/"
  // "http://localhost:4000/graphql"
  // "exp://192.168.1.65:19000/graphql"
  uri: "http://192.168.1.65:4000/",
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={ROUTES.Landing}
            screenOptions={{
              headerTintColor: "#00171F",
              headerStyle: {
                backgroundColor: "#F2F3EF",
              },
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen
              name={ROUTES.Home}
              component={HomeScreen}
              options={{ title: "Summary", headerShown: false }}
            />
            <Stack.Screen
              name={ROUTES.Landing}
              component={LandingScreen}
              options={{ title: "PackItUp", headerShown: false }}
            />
            <Stack.Screen
              name={ROUTES.Login}
              component={LoginScreen}
              options={{ title: ROUTES.Login, headerShown: false }}
            />
            <Stack.Screen
              name={ROUTES.Register}
              component={RegisterScreen}
              options={{ title: ROUTES.Register, headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
