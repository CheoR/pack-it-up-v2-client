import { StyleSheet, View } from "react-native";
import React from "react";

import Badge, { Badges } from "../Badge";

export default function Column1(badges: Badges) {
  return (
    <View style={styles.column}>
      <Badge
        count={badges.badge1.count}
        size={badges.badge1.size}
        showType={badges.badge1.showType}
        type={badges.badge1.type}
      />
      {badges.badge2 && (
        <Badge
          count={badges.badge2.count}
          size={badges.badge2.size}
          showType={badges.badge2.showType}
          type={badges.badge2.type}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    width: 64,
  },
});
