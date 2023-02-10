import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import COLORS from "../constants/Colors";

// TODO: use util to make all optional
// except name
interface IColumnTwo {
  defaultDropdownValue?: string;
  description?: string;
  disableDropdown?: boolean;
  dropdown?: object[];
  name: string;
  isFragile?: boolean;
  showDropdown?: boolean;
  showValues?: boolean;
  value?: number;
}

export default function ColumnTwo({
  defaultDropdownValue = "",
  description = "",
  disableDropdown = true,
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

  useEffect(() => {
    // defaultValue was removed in 5.x series.
    // https://github.com/hossein-zare/react-native-dropdown-picker/issues/550#issuecomment-1122804565
    const setDropdownDefaultValue = () => {
      const obj = dropdown.find((obj) => obj?._id === defaultDropdownValue);
      setDropdownValue(obj?.name);
    };
    setDropdownDefaultValue();
  }, []);

  return (
    <View style={styles.column}>
      <View style={styles.text}>
        <Text style={styles.name}>{name?.slice(0, 20) || "Header"}</Text>
        {showDropdown && dropdown?.length ? (
          <DropDownPicker
            disabled={disableDropdown}
            items={items}
            itemKey="_id"
            listMode="SCROLLVIEW"
            open={open}
            schema={{
              label: "name",
              value: "name",
            }}
            setOpen={setOpen}
            setItems={setItems}
            style={{
              minHeight: 4,
              backgroundColor: disableDropdown
                ? "lightgray"
                : COLORS.light.background,
            }}
            setValue={setDropdownValue}
            value={dropdownValue}
            // onSelectItem={(item) => {
            //   console.log("selected", item);
            // }}
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
