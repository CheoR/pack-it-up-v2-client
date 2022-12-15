import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";

import COLORS from "../constants/Colors";

export default function LoggedInLayout({ children }) {
  return <View style={styles.layout}>{children}</View>;
}

const styles = StyleSheet.create({
  layout: {
    alignItems: "center",
    backgroundColor: COLORS.light.background,
    flex: 1,
    justifyContent: "space-between",
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 8,
  },
});
