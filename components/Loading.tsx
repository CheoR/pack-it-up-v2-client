import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";

import BoxLogo from "./BoxLogo";

export default function Loading({ text }) {
  return (
    <View style={styles.loading}>
      <BoxLogo />
      <View style={styles.viewHeader}>
        <Text style={styles.viewHeaderText}>Loading . . {text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  viewHeader: {
    display: "flex",
    alignItems: "center",
    width: "80%",
    paddingVertical: 8,
  },
  viewHeaderText: {
    color: Colors.light.text,
  },
});
