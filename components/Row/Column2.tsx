import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useQuery } from "@apollo/client";
import Checkbox from "expo-checkbox";

import { GET_BOXES } from "../../screens/Boxes";
import { GET_MOVES } from "../../screens/Moves";
import COLORS from "../../constants/Colors";

interface IColumnTwo {
  canEdit?: boolean;
  defaultDropdownValue?: string;
  description?: string;
  disableDropdown?: boolean;
  dropdown?: object[];
  isFragile?: boolean;
  name: string;
  showDropdown?: boolean;
  showValues?: boolean;
  type: string;
  value?: number;
  updateObj: (obj) => {};
}

export default function Column2({
  canEdit = false,
  defaultDropdownValue = "",
  description = "",
  disableDropdown = false,
  name,
  isFragile = false,
  showDropdown = true,
  showValues = true,
  type = "",
  value = 0,
  updateObj,
}: IColumnTwo) {
  const [isChecked, setIsChecked] = useState(isFragile);
  const [dropdownData, setDropdownData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  value = parseFloat(value?.toFixed(2)) || 0;
  console.log(`defaultDropdownValue: ${defaultDropdownValue}`);

  const { loading: dropdownLoading, error: dropdownError } = useQuery(
    type === "item" ? GET_BOXES : GET_MOVES,
    {
      onCompleted: (data) => {
        // defaultValue was removed in 5.x series.
        // https://github.com/hossein-zare/react-native-dropdown-picker/issues/550#issuecomment-1122804565
        setDropdownData(data.getBoxesByUserId);
        let obj;
        console.log(data);
        if (type === "item") {
          obj = data.getBoxesByUserId.find(
            (obj) => obj?._id === defaultDropdownValue
          );
        }
        if (type === "box") {
          obj = data.getMovesByUserId.find(
            (obj) => obj?._id === defaultDropdownValue
          );
        }
        console.log(`default selection: ${obj?.name}`);
        setSelected(obj?.name);
      },
      onError: (error) => console.log(`Query Dropdown Error: ${error.message}`),
    }
  );

  console.log(`dropdowndata lenght: ${dropdownData.length}`);

  return (
    <View style={styles.column}>
      <View style={styles.text} pointerEvents={!canEdit ? "none" : "auto"}>
        <TextInput
          style={styles.name}
          placeholder={name?.slice(0, 20) || "Header"}
          onChangeText={(text) => {
            console.log(`text: ${text}`);
            updateObj((prevState) => {
              return {
                ...prevState,
                name: text,
              };
            });
          }}
        />
        {showDropdown && dropdownData?.length ? (
          <DropDownPicker
            disabled={!disableDropdown}
            items={dropdownData}
            itemKey="_id"
            listMode="SCROLLVIEW"
            open={open}
            schema={{
              label: "name",
              value: "name",
            }}
            setOpen={setOpen}
            setItems={setDropdownData}
            style={{
              minHeight: 4,
              backgroundColor: disableDropdown
                ? "lightgray"
                : COLORS.light.background,
            }}
            setValue={setDropdownData}
            value={selected}
            onSelectItem={(item) => {
              console.log("selected", item);
            }}
          />
        ) : (
          showDropdown! && (
            <Text style={styles.dropdown}>Dropdown/Box item belongs to</Text>
          )
        )}
        <TextInput
          style={styles.description}
          placeholder={
            description?.slice(0, 55) || `${name} description`.slice(0, 55)
          }
          onChangeText={(text) => {
            console.log(`description: ${text}`);
            updateObj((prevState) => {
              return {
                ...prevState,
                description: text,
              };
            });
          }}
        />
      </View>
      {showValues && (
        <View style={styles.values} pointerEvents={!canEdit ? "none" : "auto"}>
          {/* TODO: swap out checkbox and remove from packages */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={() => {
                setIsChecked((prevState) => {
                  updateObj((prevState) => {
                    console.log(
                      `prevState: ${prevState} new state: ${!prevState}`
                    );
                    return {
                      ...prevState,
                      isFragile: !prevState,
                    };
                  });

                  return !prevState;
                });
                console.log(`${name} isFragile: ${!isChecked}`);
              }}
              disabled={!canEdit} // true => isDisabled = false
              color={isChecked ? COLORS.light.action : undefined}
            />
            <Text style={styles.label}>Fragile</Text>
          </View>
          <TextInput
            style={styles.value}
            placeholder={`$${value || 0.0}`}
            onChangeText={(text) => {
              updateObj((prevState) => {
                return {
                  ...prevState,
                  value: Number(text),
                };
              });
            }}
            keyboardType="numeric"
          />
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
