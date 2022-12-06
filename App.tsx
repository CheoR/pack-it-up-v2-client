import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Button, Text, View, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

const ROUTES = {
  Landing: "Landing",
  Register: "Register",
  CreatePost: "CreatePost",
};

function LandingScreen({ navigation, route }) {
  return (
    <View style={styles.landing}>
      <Text>PackItUp</Text>
      <Button
        title="Register"
        onPress={() => navigation.navigate(ROUTES.Register)}
      />
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate(ROUTES.Register, {
            itemId: 86,
            someVariable: "i am variable",
          });
        }}
      />

      <Button
        title="Create post"
        onPress={() => navigation.navigate("CreatePost")}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

function RegisterScreen({ route, navigation }) {
  const { itemId, someVariable } = route.params;

  return (
    <View style={styles.register}>
      <Text>Register Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(someVariable)}</Text>

      <Button
        title="Go to Details... again"
        // onPress={() => navigation.push(ROUTES.Register)}
        onPress={() =>
          navigation.push(ROUTES.Register, {
            itemId: Math.floor(Math.random() * 100),
          })
        }
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

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState("");

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: "Landing",
            params: { post: postText },
            merge: true,
          });
        }}
      />
    </>
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
        <Stack.Screen name={ROUTES.CreatePost} component={CreatePostScreen} />
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
