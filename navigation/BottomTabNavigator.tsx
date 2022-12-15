import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MovesScreen from "../screens/Moves";
import BoxesScreen from "../screens/Boxes";
import ItemsScreen from "../screens/Items";
import ROUTES from "../constants/Routes";
import HomeScreen from "../screens/Home";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.Home}
      screenOptions={{
        headerTintColor: "#00171F",
        headerStyle: {
          backgroundColor: "#F2F3EF",
        },
        headerTitleAlign: "center",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={ROUTES.Home}
        component={HomeScreen}
        options={{ title: ROUTES.Home }}
      />
      <Tab.Screen
        name={ROUTES.Moves}
        component={MovesScreen}
        options={{ title: "Moves" }}
      />
      <Tab.Screen
        name={ROUTES.Boxes}
        component={BoxesScreen}
        options={{ title: "Boxes" }}
      />
      <Tab.Screen
        name={ROUTES.Items}
        component={ItemsScreen}
        options={{ title: "Items" }}
      />
    </Tab.Navigator>
  );
}
