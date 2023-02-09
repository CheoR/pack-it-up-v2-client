import React from "react";
import { StyleSheet, View } from "react-native";

import { Badge as BadgeType } from "./Badge";
import Badge from "./Badge";
interface Badges {
  badge1: BadgeType;
  badge2?: BadgeType;
}

export default function ColumnOne(badges: Badges) {
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
