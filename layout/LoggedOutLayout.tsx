import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";

import SocialsIcons from "../components/SocialsIcons";
import COLORS from "../constants/Colors";
import { Icon } from "../constants/Icon";

export default function LoggedOutLayout({ children }) {
  return (
    <View style={styles.layout}>
      <Icon type="closedPackage" size={208} />
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
