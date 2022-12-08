import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import Colors from "../constants/Colors";
import BoxLogo from "../components/BoxLogo";
import SocialsIcons from "../components/SocialsIcons";

export default function Layout({ children }) {
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
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 8,
    justifyContent: "space-between",
    marginTop: Constants.statusBarHeight,
    backgroundColor: Colors.light.background,
  },
});
