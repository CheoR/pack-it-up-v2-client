import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { Badge as BI } from "../types/types";
import { Icon } from "../constants/Icon";
import COLORS from "../constants/Colors";

function Badge({
  count = 0,
  size = 16,
  showCount = true,
  showType = true,
  src,
  type = "none",
}: BI): JSX.Element {
  return src ? (
    <Image
      style={styles.userImg}
      source={{
        // uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==",
        // uri: "https://res.cloudinary.com/cheor/image/upload/v1679785326/I%20am%20oink%20pug.jpg",
        // uri: "https://reactnative.dev/img/tiny_logo.png",
        uri: src || "https://reactnative.dev/img/tiny_logo.png",
      }}
    />
  ) : (
    <View style={styles.img}>
      <View style={styles.icon}>
        {showCount ? (
          <View style={styles.hasCount}>
            <Text style={styles.count}>{count}</Text>
          </View>
        ) : (
          <View style={styles.hasNoCount}>
            <Text style={styles.count}> </Text>
          </View>
        )}
        <Icon type={type} size={size} />
      </View>
      {showType && <Text style={styles.text}>{type}</Text>}
    </View>
  );
}

export default Badge;

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
  userImg: {
    backgroundColor: COLORS.light.background,
    borderRadius: 8,
    borderWidth: 4,
    borderColor: COLORS.light.tabIconSelected,
    height: 56,
    marginTop: 8,
    width: 56,
  },
});
