import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Icon, PossibleIcons, PossibleIconSizes } from "../constants/Icon";

// TODO: add option to display image url else
// show Item icon as default
export type Badge = {
  count: number;
  type: PossibleIcons;
  size?: PossibleIconSizes;
  showType?: boolean;
};

export default function Badge({
  count = 0,
  size = 16,
  showType = true,
  type = "none",
}: Badge) {
  return (
    <View style={styles.box}>
      <View style={styles.iconBox}>
        <View style={styles.countCircle}>
          <Text style={styles.countText}>{count}</Text>
        </View>
        <Icon type={type} size={size} />
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
