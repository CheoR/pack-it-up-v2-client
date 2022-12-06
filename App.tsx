import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Button, Text, View, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

const ROUTES = {
  Landing: "Landing",
  Login: "Login",
  Register: "Register",
  CreatePost: "CreatePost",
  DisplayRoute: "DisplayRoute",
};

function LandingScreen({ navigation, route }) {
  return (
    <View style={styles.landing}>
      <Text>PackItUp</Text>
      <Button
        title={ROUTES.Register}
        onPress={() => navigation.navigate(ROUTES.Register)}
      />
      <Button
        title={ROUTES.Login}
        onPress={() => navigation.navigate(ROUTES.Login)}
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
        onPress={() => navigation.navigate(ROUTES.CreatePost)}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
      <Button
        title="I am display route"
        onPress={() => {
          navigation.navigate(ROUTES.DisplayRoute, {
            itemId: 86,
            someVariable: "i am variable",
          });
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

function RegisterScreen({ route, navigation }) {
  let itemId,
    someVariable = "";
  try {
    ({ itemId, someVariable } = route.params);
  } catch (error) {
    console.log("");
  }

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
        onPress={() => navigation.navigate(ROUTES.Landing)}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

function LoginScreen({ navigation }) {
  return (
    <View style={styles.login}>
      <Text>Login Screen</Text>

      <Button
        title={ROUTES.Register}
        onPress={() => navigation.push(ROUTES.Register)}
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate(ROUTES.Landing)}
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
            name: ROUTES.Landing,
            params: { post: postText },
            merge: true,
          });
        }}
      />
    </>
  );
}

function DisplayRouteScreen({ navigation, route }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount((c) => c + 1)} title="CountUpdated" />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.register}>
      <Text>Display route Screen</Text>
      <Text>{route.params.name}</Text>
      <Text>Count: {count}</Text>

      <Button
        title="Go to Details... again"
        onPress={() => navigation.push(ROUTES.Register)}
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate(ROUTES.Landing)}
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

const styles = StyleSheet.create({
  landing: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  login: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
  register: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
});
