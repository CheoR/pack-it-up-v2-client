import { Button, StyleSheet, Text, TextInput, View } from "react-native";

import Colors from "../constants/Colors";
import ROUTES from "../constants/Routes";
import Layout from "../layout/Layout";

export default function RegisterScreen({ navigation }) {
  return (
    <Layout>
      <View style={styles.screen}>
        <View style={styles.inputBlock}>
          <TextInput placeholder="Username" style={styles.input} />
          <TextInput placeholder="First Name" style={styles.input} />
          <TextInput placeholder="Last Name" style={styles.input} />
          <TextInput placeholder="Email" style={styles.input} />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry={true}
          />
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.action}>
          <Button
            title={ROUTES.Register}
            color={Colors.light.tabIconDefault}
            onPress={() => navigation.navigate(ROUTES.Landing)}
          />
          <View style={styles.actionBlock}>
            <Text>
              Already Registered,{" "}
              <Text
                style={styles.actionBlockText}
                onPress={() => navigation.push(ROUTES.Register)}
              >
                Login!
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  action: {
    width: "100%",
  },
  actionBlock: {
    alignItems: "center",
  },
  actionBlockText: {
    color: Colors.light.action,
  },
  input: {
    borderBottomColor: Colors.light.tabIconDefault,
    borderBottomWidth: 8,
  },
  inputBlock: {
    justifyContent: "space-between",
    width: "80%",
    height: 300,
  },
  screen: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
