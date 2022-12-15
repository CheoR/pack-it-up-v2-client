import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNavigator from "../navigation/BottomTabNavigator";
import RegisterScreen from "../screens/Register";
import LandingScreen from "../screens/Landing";
import LoginScreen from "../screens/Login";

import ROUTES from "../constants/Routes";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  // TODO: Instead of nested try to use group
  // https://reactnavigation.org/docs/nesting-navigators/#navigating-to-a-screen-in-a-nested-navigator
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.Landing}
      screenOptions={{
        headerTintColor: "#00171F",
        headerStyle: {
          backgroundColor: "#F2F3EF",
        },
        headerTitleAlign: "center",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={ROUTES.LoggedIn}
        component={BottomTabNavigator}
        options={{ title: "Summary" }}
      />
      <Stack.Screen
        name={ROUTES.Landing}
        component={LandingScreen}
        options={{ title: "PackItUp" }}
      />
      <Stack.Screen
        name={ROUTES.Login}
        component={LoginScreen}
        options={{ title: ROUTES.Login }}
      />
      <Stack.Screen
        name={ROUTES.Register}
        component={RegisterScreen}
        options={{ title: ROUTES.Register }}
      />
    </Stack.Navigator>
  );
}
