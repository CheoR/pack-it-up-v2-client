import React from "react";
import { StyleSheet, View } from "react-native";

import COLORS from "../constants/Colors";
import ColumnThree from "./ColumnThree";
import ColumnOne from "./ColumnOne";
import ColumnTwo from "./ColumnTwo";

interface IListItem {
  count: number;
  description?: string;
  isFragile?: boolean;
  objKey: string;
  name?: string;
  showValues: boolean;
  thirdColumn?: boolean;
  type: string;
  value?: number;
}

export default function ListItem({
  count,
  description,
  isFragile = false,
  objKey,
  name,
  showValues = true,
  thirdColumn = true,
  type,
  value = 0,
}: IListItem) {
  return (
    <View style={styles.row}>
      <ColumnOne count={count} type={type} />
      <ColumnTwo
        description={description}
        isFragile={isFragile}
        header={name}
        showValues={showValues}
        value={value}
      />
      <ColumnThree
        iconType="chevron"
        listView={type}
        showIcon={thirdColumn}
        objKey={objKey}
      />
    </View>
  );
}

// TODO: either use 3rd components
// or this package to get the drop shadows
// https://github.com/SrBrahma/react-native-shadow-2
const styles = StyleSheet.create({
  row: {
    borderRadius: 6,
    elevation: 2,
    flexDirection: "row",
    height: 160,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: COLORS.light.tabIconDefault,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
  },
});
