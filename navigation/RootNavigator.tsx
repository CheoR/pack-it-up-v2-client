import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNavigator from "../navigation/BottomTabNavigator";
import { RootStackParamList } from "../types/types";
import RegisterScreen from "../screens/Register";
import LandingScreen from "../screens/Landing";
import LoginScreen from "../screens/Login";

import ROUTES from "../constants/Routes";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  // TODO: Instead of nested try to use group
  // https://reactnavigation.org/docs/nesting-navigators/#navigating-to-a-screen-in-a-nested-navigator
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.Landing as keyof RootStackParamList}
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
        name={ROUTES.LoggedIn as keyof RootStackParamList}
        component={BottomTabNavigator}
        options={{ title: "Summary" }}
      />
      <Stack.Screen
        name={ROUTES.Landing as keyof RootStackParamList}
        component={LandingScreen}
        options={{ title: "PackItUp" }}
      />
      <Stack.Screen
        name={ROUTES.Login as keyof RootStackParamList}
        component={LoginScreen}
        options={{ title: ROUTES.Login }}
      />
      <Stack.Screen
        name={ROUTES.Register as keyof RootStackParamList}
        component={RegisterScreen}
        options={{ title: ROUTES.Register }}
      />
    </Stack.Navigator>
  );
}
