import React from "react";
import { StyleSheet, View } from "react-native";

import Icon from "./Icon";

type Badge = {
  count: number;
  type: string;
  showType: boolean;
};
// TODO: refactor to include defaults
// count: 0
// showType: false
interface Badges {
  badge1: Badge;
  badge2?: Badge;
}

export default function ColumnOne(badges: Badges) {
  return (
    <View style={styles.column}>
      <Icon
        count={badges.badge1.count}
        type={badges.badge1.type}
        showType={badges.badge1.showType}
      />
      {badges.badge2 && (
        <Icon
          count={badges.badge2.count}
          type={badges.badge2.type}
          showType={badges.badge2.showType}
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
