import { StyleSheet, Button, Text, View } from "react-native";
import ROUTES from "../constants/Routes";

export default function RegisterScreen({ route, navigation }) {
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

const styles = StyleSheet.create({
  register: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
});
