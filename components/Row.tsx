import React from "react";
import { StyleSheet, View } from "react-native";

import COLORS from "../constants/Colors";

import ColumnThree from "./ColumnThree";
import ColumnTwo from "./ColumnTwo";
import ColumnOne from "./ColumnOne";

export default function Row({ obj, rest, type }) {
  return (
    <View style={styles.row}>
      <ColumnOne badge1={{ type: type, showType: rest.showType }} />
      <ColumnTwo
        description={obj.description}
        isFragile={obj.isFragile}
        name={obj.name}
        value={obj.value}
        defaultDropdownValue={rest.defaultDropdownValue}
        disableDropdown={rest.disableDropdown}
        showDropdown={rest.showDropdown}
        showValues={rest.showValues}
      />
      <ColumnThree
        disableDropdown={false}
        iconType="chevron"
        listView={type}
        obj={obj}
        objKey={obj._id}
        showIcon={true}
        type={type}
        dropdown={rest.dropdown}
        rest={{
          defaultDropdownValue: rest.defaultDropdownValue,
          disableDropdown: true,
          showDropdown: true,
          showType: false,
          showValues: true,
          updateObj: rest.updateObj,
          showIcon: false,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  column1: {
    width: 64,
  },
  column2: {
    flex: 2,
    justifyContent: "space-between",
  },
  column3: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: 40,
  },
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
