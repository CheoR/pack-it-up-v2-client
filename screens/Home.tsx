import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Checkbox from "expo-checkbox";
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
  const [isChecked, setChecked] = React.useState(true);

  return (
    <View style={styles.screen}>
      <View style={styles.viewHeader}>
        <Text style={styles.viewHeaderText}>Summary</Text>
      </View>
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
      <View style={{ backgroundColor: "pink" }}>
        <View style={styles.valueInput}>
          <Text style={{ backgroundColor: "yellow" }}>total</Text>
          <TextInput style={{ backgroundColor: "green" }} editable={false}>
            $100
          </TextInput>
        </View>
        <View style={styles.checkboxContainer}>
          {/* TODO: swap out checkbox and remove from packages */}
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            disabled
            color={isChecked ? "#4630EB" : undefined}
          />
          <Text style={styles.label}>Fragile</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginTop: Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 24,
    paddingHorizontal: 16,
    // backgroundColor: Colors.light.background,
    backgroundColor: "lightblue",
    flex: 1,
    width: "100%",
  },
  viewHeader: {
    backgroundColor: Colors.light.tabIconDefault,
    display: "flex",
    alignItems: "center",
    width: "80%",
    paddingVertical: 8,
  },
  valueInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "lightgreen",
    width: 300,
  },
  viewHeaderText: {
    color: Colors.light.text,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
