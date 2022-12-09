import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";

import Colors from "../constants/Colors";

export default function HomeScreen({ route }) {
  const response = {};
  // TODO: fix - find way to get properties from response
  // object without having to do this
  if ("loginUser" in route.params) {
    const { loginUser } = route.params;
    Object.assign(response, loginUser);
  } else {
    const { registerUser } = route.params;
    Object.assign(response, registerUser);
  }
  const { token, email, username } = response;
  return (
    <View style={styles.view}>
      <View style={styles.viewHeader}>
        <Text style={styles.viewHeaderText}>Summary</Text>
      </View>
      <Text>Home Screen</Text>
      <Text>Username: {username}</Text>
      <Text>Email: {email}</Text>
      <View>
        <View>
          <Text>Moves</Text>
        </View>
        <View>
          <Text>Boxes</Text>
        </View>
        <View>
          <Text>Items</Text>
        </View>
      </View>
      <View>
        <Text>total</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    marginTop: Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.background,
  },
  viewHeader: {
    backgroundColor: Colors.light.tabIconDefault,
    display: "flex",
    alignItems: "center",
    width: "80%",
    paddingVertical: 8,
  },
  viewHeaderText: {
    color: Colors.light.text,
  },
});
