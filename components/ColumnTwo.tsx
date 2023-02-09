import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";

// TODO: use util to make all optional
// except name
interface IColumnTwo {
  description?: string;
  dropdown?: [];
  name: string;
  isFragile?: boolean;
  showDropdown?: boolean;
  showValues?: boolean;
  value?: number;
}

export default function ColumnTwo({
  description = "",
  dropdown = [],
  name,
  isFragile = false,
  showDropdown = false,
  showValues = false,
  value = 0,
}: IColumnTwo) {
  const [dropdownValue, setDropdownValue] = useState(null);
  const [isChecked, setIsChecked] = useState(isFragile);
  const [items, setItems] = useState(dropdown);
  const [open, setOpen] = useState(false);

  value = parseFloat(value?.toFixed(2)) || 0;

  return (
    <View style={styles.column}>
      <View style={styles.text}>
        <Text style={styles.name}>{name?.slice(0, 20) || "Header"}</Text>
        {showDropdown && dropdown?.length ? (
          <DropDownPicker
            listMode="SCROLLVIEW"
            itemKey="_id"
            schema={{
              label: "name",
              value: "name",
            }}
            open={open}
            value={dropdownValue}
            items={items}
            setOpen={setOpen}
            setValue={setDropdownValue}
            setItems={setItems}
            style={{
              minHeight: 4,
            }}
          />
        ) : (
          showDropdown! && (
            <Text style={styles.dropdown}>Dropdown/Box item belongs to</Text>
          )
        )}
        <Text style={styles.description}>
          {description?.slice(0, 55) || `${name} description`.slice(0, 55)}
        </Text>
      </View>
      {showValues && (
        <View style={styles.values}>
          {/* TODO: swap out checkbox and remove from packages */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setIsChecked}
              disabled
              color={isChecked ? "#4630EB" : undefined}
            />
            <Text style={styles.label}>Fragile</Text>
          </View>
          <Text style={styles.value}>${value}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  value: {
    textAlignVertical: "center",
  },
  values: {
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkbox: {
    alignSelf: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  column: {
    flex: 2,
    justifyContent: "space-between",
  },
  description: {
    fontSize: 16,
  },
  dropdown: {
    fontSize: 12,
  },
  name: {
    fontSize: 24,
  },
  label: {
    margin: 8,
  },
  text: {
    flex: 1,
  },
});
