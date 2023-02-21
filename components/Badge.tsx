import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Badge as BI } from "../types/types";
import { Icon } from "../constants/Icon";

// TODO: add option to display image url else
// show Item icon as default

export default function Badge({
  count = 0,
  size = 16,
  showType = true,
  type = "none",
}: BI) {
  return (
    <View style={styles.img}>
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
  icon: {
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    justifyContent: "space-between",
    width: 64,
  },
  text: {
    textAlign: "center",
    textTransform: "uppercase",
  },
});
