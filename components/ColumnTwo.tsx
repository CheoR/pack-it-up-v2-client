import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

interface IColumnTwo {
  description?: string;
  header?: string;
  showValues: boolean;
  value?: number;
}

export default function ColumnTwo({
  description,
  header,
  showValues = true,
  value = 0,
}: IColumnTwo) {
  const [isChecked, setIsChecked] = React.useState(false);

  return (
    <View style={styles.column}>
      <View style={styles.text}>
        <Text style={styles.header}>{header || "Header"}</Text>
        <Text style={styles.dropdown}>Dropdown/What item belongs to</Text>
        <Text style={styles.description}>
          {description || "Description: replace dropdown with a real dropdown"}
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
  header: {
    fontSize: 24,
  },
  label: {
    margin: 8,
  },
  text: {
    flex: 1,
  },
});
