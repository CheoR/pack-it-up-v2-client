import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { BottomStackParamList } from "../types/types";
import SettingsScreen from "../components/Settings";
import MovesScreen from "../screens/Moves";
import BoxesScreen from "../screens/Boxes";
import ItemsScreen from "../screens/Items";
import HomeScreen from "../screens/Home";
import ROUTES from "../constants/Routes";
import COLORS from "../constants/Colors";

const Tab = createBottomTabNavigator<BottomStackParamList>();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.Home as keyof BottomStackParamList}
      screenOptions={({ route }) => ({
        headerTintColor: "#00171F",
        headerStyle: {
          backgroundColor: "#F2F3EF",
        },
        headerTitleAlign: "center",
        headerShown: false,
        tabBarActiveTintColor: COLORS.light.action,
        tabBarInactiveTintColor: COLORS.light.text,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // TODO: refactor
          if (route.name === ROUTES.Home) {
            iconName = focused ? "home-outline" : "home-variant";
          } else if (route.name === ROUTES.Moves) {
            iconName = focused ? "dolly" : "dolly";
          } else if (route.name === ROUTES.Boxes) {
            iconName = focused
              ? "package-variant-closed"
              : "package-variant-closed";
          } else if (route.name === ROUTES.Items) {
            iconName = focused
              ? "clipboard-text-outline"
              : "clipboard-text-outline";
          } else {
            iconName = focused ? "settings-helper" : "settings-helper";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        name={ROUTES.Home as keyof BottomStackParamList}
        component={HomeScreen}
        options={{ title: ROUTES.Home }}
      />
      <Tab.Screen
        name={ROUTES.Moves as keyof BottomStackParamList}
        component={MovesScreen}
        options={{ title: "Moves" }}
      />
      <Tab.Screen
        name={ROUTES.Boxes as keyof BottomStackParamList}
        component={BoxesScreen}
        options={{ title: "Boxes" }}
      />
      <Tab.Screen
        name={ROUTES.Items as keyof BottomStackParamList}
        component={ItemsScreen}
        options={{ title: "Items" }}
      />
      <Tab.Screen
        name={ROUTES.Settings as keyof BottomStackParamList}
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </Tab.Navigator>
  );
}
