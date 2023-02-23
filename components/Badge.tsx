import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Badge as BI } from "../types/types";
import { Icon } from "../constants/Icon";

// TODO:
//  add option to display image url else
//  find out why cannot override showCount
//
export default function Badge({
  count = 0,
  size = 16,
  showCount = true,
  showType = true,
  type = "none",
}: BI) {
  return (
    <View style={styles.img}>
      <View style={styles.icon}>
        {showCount ? (
          <View style={styles.hasCount}>
            <Text style={styles.count}>{count}</Text>
          </View>
        ) : (
          <View style={styles.hasNoCount}>
            <Text style={styles.count}></Text>
          </View>
        )}
        <Icon type={type} size={size} />
      </View>
      {showType && <Text style={styles.text}>{type}</Text>}
    </View>
  );
}
// TODO: pass prop to hasCount to flip borderWidth if hasCount
const styles = StyleSheet.create({
  count: {
    fontSize: 12,
  },
  hasCount: {
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
  hasNoCount: {
    alignItems: "center",
    borderRadius: 0,
    borderWidth: 0,
    height: 20,
    justifyContent: "center",
    left: 15,
    position: "relative",
    top: 10,
    width: 20,
    backgroundColor: "lightblue",
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
