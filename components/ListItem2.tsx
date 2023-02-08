import React from "react";
import { StyleSheet, View } from "react-native";

import COLORS from "../constants/Colors";

// const topBadge = {
//   count,
//   type,
//   showType: true,
// };
// const bottomBadge = {
//   count,
//   type,
//   showType: true,
// };

export default function ListItem({ children }) {
  return <View style={styles.row}>{children}</View>;
  // <ColumnOne badge1={topBadge} badge2={bottomBadge} />;
  // <ColumnTwo
  //   description={description}
  //   dropdown={dropdown}
  //   isFragile={isFragile}
  //   header={name}
  //   showValues={showValues}
  //   value={value}
  // />
  // <ColumnThree
  // iconType="chevron"
  // listView={type}
  // showIcon={thirdColumn}
  // objKey={objKey}
  // dropdown={dropdown}
  // />
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
