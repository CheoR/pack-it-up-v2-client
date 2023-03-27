import React from "react";
import { StyleSheet, View } from "react-native";

import { Badge as BI, ColumnOne as COI } from "../types/types";
import { isItem, isMove } from "../utils/utils";
import Badge from "./Badge";

export default function Column1(column1: COI) {
  let badge1: BI = {
    type: "item",
    count: 0,
    showCount: true,
    showType: true,
  };

  let badge2: BI = {
    type: "box",
    count: 0,
    showCount: true,
    showType: true,
  };
  let objIsMove = false;

  if (isMove(column1)) {
    badge1 = {
      ...badge1,
      type: "box",
      count: column1.count,
      showCount: column1.showCount,
      showType: column1.showType,
    };
    badge2 = {
      ...badge2,
      type: "item",
      count: column1.boxItemsCount,
      showCount: column1.showCount,
      showType: column1.showType,
    };
    objIsMove = true;
  } else {
    badge1 = {
      ...badge1,
      count: column1.count,
      showCount: column1.showCount,
      showType: column1.showType,
    };
  }

  if (isItem(column1)) {
    badge1 = {
      ...badge1,
      count: 0,
      type: "item",
      showCount: false,
      showType: true,
      src: column1.image_uri,
    };
  }

  return (
    <View style={styles.column}>
      <Badge {...badge1} />
      {objIsMove && <Badge {...badge2} />}
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    width: 64,
  },
});
