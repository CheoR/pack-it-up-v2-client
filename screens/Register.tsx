import { StyleSheet, Button, Text, TextInput, View } from "react-native";

import SocialsIcons from "../components/SocialsIcons";
import BoxLogo from "../components/BoxLogo";
import Colors from "../constants/Colors";
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
      <BoxLogo />
      <View style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput placeholder="Username" />
          <TextInput placeholder="First Name" />
          <TextInput placeholder="Last Name" />
          <TextInput placeholder="Email" />
          <TextInput placeholder="Password" secureTextEntry={true} />
          <TextInput placeholder="Confirm Password" secureTextEntry={true} />
        </View>
      </View>

      <View style={{ width: "100%" }}>
        <Button
          title={ROUTES.Register}
          color={Colors.light.tabIconDefault}
          onPress={() => navigation.navigate(ROUTES.Landing)}
        />
        <View style={{ alignItems: "center" }}>
          <Text>
            Already Registered,{" "}
            <Text
              style={{ color: Colors.light.action }}
              onPress={() => navigation.push(ROUTES.Register)}
            >
              Login!
            </Text>
          </Text>
        </View>
      </View>
      <SocialsIcons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 160,
    alignItems: "center",
  },
  inputGroup: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
  },
  register: {
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.background,
  },
});
