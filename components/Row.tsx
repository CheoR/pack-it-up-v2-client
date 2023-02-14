import React from "react";
import { StyleSheet, View } from "react-native";

import COLORS from "../constants/Colors";

export default function Row(obj: any) {
  return <View style={styles.row}></View>;
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

// Object {
//   "__typename": "Item",
//   "_id": "63e5583af3ba57523ef5367d",
//   "box_id": "63dc13e9a0701458e545ecbe",
//   "description": "",
//   "isFragile": false,
//   "name": "shirts",
//   "value": 199.99,
// },
