import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";

import SocialsIcons from "../components/SocialsIcons";
import BoxLogo from "../components/BoxLogo";
import COLORS from "../constants/Colors";

export default function LoggedOutLayout({ children }) {
  return (
    <View style={styles.layout}>
      <BoxLogo />
      {children}
      <SocialsIcons />
    </View>
  );
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
