import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Button, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

const ROUTES = {
  Landing: "Landing",
  Register: "Register",
};

function LandingScreen({ navigation }) {
  return (
    <View style={styles.landing}>
      <Text>PackItUp</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate(ROUTES.Register)}
      />
      <StatusBar style="auto" />
    </View>
  );
}

function RegisterScreen({ navigation }) {
  return (
    <View style={styles.register}>
      <Text>Register Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Register")}
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("Landing")}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

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
        <Stack.Screen name={ROUTES.Register} component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  landing: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  register: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
});
