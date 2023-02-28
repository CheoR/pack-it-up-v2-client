import React from "react";
import { StyleSheet, View } from "react-native";

import { Row2 as RTI } from "../../types/types";
import COLORS from "../../constants/Colors";
import Column1 from "./Column1";
import Column2 from "./Column2";
import Column3 from "./Column3";

// TODO: either use 3rd components
// or this package to get the drop shadows
// https://github.com/SrBrahma/react-native-shadow-2
export default function Row2({ column1, column2, column3 }: RTI) {
  return (
    <View style={styles.row}>
      <Column1 {...column1} />
      <Column2 {...column2} />
      <Column3 {...column3} />
    </View>
  );
}

const styles = StyleSheet.create({
  column1: {
    width: 64,
  },
  column2: {
    flex: 2,
    justifyContent: "space-between",
  },
  column3: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: 40,
  },
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
