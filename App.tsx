import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Button } from "react-native";

import DisplayRouteScreen from "./screens/DisplayRoute";
import CreatePostScreen from "./screens/CreatePost";
import RegisterScreen from "./screens/Register";
import LandingScreen from "./screens/Landing";
import LoginScreen from "./screens/Login";

import ROUTES from "./constants/Routes";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
          name={ROUTES.Landing}
          component={LandingScreen}
          options={{ title: "PackItUp" }}
        />
        <Stack.Screen name={ROUTES.Login} component={LoginScreen} />
        <Stack.Screen name={ROUTES.Register} component={RegisterScreen} />
        <Stack.Screen name={ROUTES.CreatePost} component={CreatePostScreen} />
        <Stack.Screen
          name={ROUTES.DisplayRoute}
          component={DisplayRouteScreen}
          options={({ route }) => ({
            title: route.params.name || "route.params.name not found",
            headerRight: () => (
              <Button
                onPress={() => alert("This is a button!")}
                title="Info"
                color="#fff"
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
