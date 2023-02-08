import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Icons, PossibleIcons } from "../constants/Icons";

export type Badge = {
  count: number;
  type: PossibleIcons;
  showType: boolean;
};

export default function Badge({
  count = 0,
  type = "none",
  showType = false,
}: Badge) {
  return (
    <View style={styles.box}>
      <View style={styles.iconBox}>
        <View style={styles.countCircle}>
          <Text style={styles.countText}>{count}</Text>
        </View>
        {Icons(type)}
      </View>
      {showType && <Text style={styles.typeText}>{type.toUpperCase()}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    justifyContent: "space-between",
    width: 64,
  },
  iconBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  countCircle: {
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 2,
    height: 20,
    justifyContent: "center",
    left: 15,
    position: "relative",
    top: 10,
    width: 20,
  },
  countText: {
    fontSize: 12,
  },
  typeText: {
    textAlign: "center",
  },
});