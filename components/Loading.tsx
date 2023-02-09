import React from "react";
import { StyleSheet, Text, View } from "react-native";

import COLORS from "../constants/Colors";
import { Icon } from "../constants/Icon";

export default function Loading({ text }) {
  return (
    <View style={styles.loading}>
      <Icon type="closedPackage" size={208} />
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
    color: COLORS.light.text,
  },
});
