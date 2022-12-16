import React from "react";
import { StyleSheet, View } from "react-native";

import COLORS from "../constants/Colors";
import ColumnThree from "./ColumnThree";
import ColumnOne from "./ColumnOne";
import ColumnTwo from "./ColumnTwo";

export default function ListItem({
  count,
  showValues = true,
  thirdColumn = true,
  type,
}) {
  return (
    <View style={styles.row}>
      <ColumnOne count={count} type={type} />
      <ColumnTwo showValues={showValues} />
      <ColumnThree type="chevron" showIcon={thirdColumn} listView={type} />
    </View>
  );
}

// TODO: either use 3rd components
// or this package to get the drop shadows
// https://github.com/SrBrahma/react-native-shadow-2
const styles = StyleSheet.create({
  row: {
    borderRadius: 6,
    elevation: 2,
    flexDirection: "row",
    height: 160,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: COLORS.light.tabIconDefault,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
  },
});
