import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, View } from "react-native";

import COLORS from "../constants/Colors";

const icons = {
  chevron: (
    <MaterialCommunityIcons
      name="chevron-right"
      size={16}
      color={COLORS.light.tint}
    />
  ),
  dots: (
    <MaterialCommunityIcons
      name="dots-vertical"
      size={16}
      color={COLORS.light.tint}
    />
  ),
  none: <></>,
};
export default function ColumnThree({ type, showIcon = true }) {
  return <View style={styles.column}>{showIcon ? icons[type] : <></>}</View>;
}

const styles = StyleSheet.create({
  column: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: 40,
  },
});
