import React from "react";
import { View, StyleSheet } from "react-native";

import Icon from "./Icon";

// TODO: refactor
interface Badges {
  badge1: {
    count: number;
    type: string;
    showType: boolean;
  };

  badge2?: {
    count: number;
    type: string;
    showType: boolean;
  };
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
