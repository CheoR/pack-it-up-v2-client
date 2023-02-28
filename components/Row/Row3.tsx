import React from "react";
import { StyleSheet, View } from "react-native";

import COLORS from "../../constants/Colors";
import { Row } from "../../types/types";
import Column3 from "./Column3";
import Column2 from "./Column2";
import Column1 from "./Column1";

export default function Row3({ column1, column2, column3 }: Row) {
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
