import { StyleSheet, Button, Text, View } from "react-native";
import ROUTES from "../constants/Routes";

export default function LoginScreen({ navigation }) {
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

const styles = StyleSheet.create({
  login: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
});
