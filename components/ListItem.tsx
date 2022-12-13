import React from "react";
import { StyleSheet, View } from "react-native";

import Colors from "../constants/Colors";
import ColumnThree from "./ColumnThree";
import ColumnOne from "./ColumnOne";
import ColumnTwo from "./ColumnTwo";

export default function ListItem({ count, type, thirdColumn = true }) {
  return (
    <View style={styles.item}>
      <ColumnOne count={count} type={type} />
      <ColumnTwo showValues={true} />
      <ColumnThree type="chevron" showIcon={thirdColumn} />
    </View>
  );
}

// TODO: either use 3rd components
// or this package to get the drop shadows
// https://github.com/SrBrahma/react-native-shadow-2
const styles = StyleSheet.create({
  item: {
    borderRadius: 6,
    elevation: 2,
    flexDirection: "row",
    marginBottom: 16,
    maxHeight: 160,
    paddingHorizontal: 16,
    shadowColor: Colors.light.tabIconDefault,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
  },
});
