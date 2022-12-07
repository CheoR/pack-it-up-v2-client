import { StyleSheet, Button, Text, View, TextInput } from "react-native";

import SocialsIcons from "../components/SocialsIcons";
import BoxLogo from "../components/BoxLogo";
import Colors from "../constants/Colors";
import ROUTES from "../constants/Routes";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.login}>
      <BoxLogo />

      <View style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput placeholder="Username" />
          <TextInput placeholder="Password" secureTextEntry={true} />
        </View>
      </View>
      <View style={{ width: "100%" }}>
        <Button
          title={ROUTES.Login}
          color={Colors.light.tint}
          onPress={() => navigation.navigate(ROUTES.Register)}
        />
        <View style={{ alignItems: "center" }}>
          <Text>
            No Account,{" "}
            <Text
              style={{ color: Colors.light.action }}
              onPress={() => navigation.push(ROUTES.Register)}
            >
              Register!
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
    height: 60,
    alignItems: "center",
  },
  inputGroup: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
  },
  login: {
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.background,
  },
});
