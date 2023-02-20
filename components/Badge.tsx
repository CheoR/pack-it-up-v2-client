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
    <View style={styles.iconCntr}>
      <View style={styles.icon}>
        <View style={styles.countCntr}>
          <Text style={styles.count}>{count}</Text>
        </View>
        <Icon type={type} size={size} />
      </View>
      {showType && <Text style={styles.text}>{type}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconCntr: {
    justifyContent: "space-between",
    width: 64,
  },
  count: {
    fontSize: 12,
  },
  countCntr: {
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
  text: {
    textAlign: "center",
    textTransform: "uppercase",
  },
});
