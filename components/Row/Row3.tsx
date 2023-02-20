import React from "react";
import { StyleSheet, View } from "react-native";

import Column3, { ColumnThree } from "./Column3";
import Column2, { ColumnTwo } from "./Column2";
import COLORS from "../../constants/Colors";
import { Badges } from "../Badge";
import Column1 from "./Column1";

interface Row3<T> {
  column1: Badges;
  column2: ColumnTwo;
  column3: ColumnThree<T>;
}

export default function Row3({
  column1,
  column2,
  column3,
}: Row3<typeof column3.obj>) {
  return (
    <View style={styles.row}>
      <Column1 {...column1} />
      <Column2 {...column2} />
      <Column3 {...column3} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    borderRadius: 6,
    elevation: 2,
    flexDirection: "row",
    height: 160,
    marginBottom: 16,
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
