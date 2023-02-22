import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useQuery } from "@apollo/client";
import Checkbox from "expo-checkbox";

import { GET_MOVES } from "../../graphql/move";
import { GET_BOXES } from "../../graphql/box";
import COLORS from "../../constants/Colors";
import {
  Box,
  Item,
  Move,
  ColumnTwo as CTI,
  PossibleTypeObj,
} from "../../types/types";
//  [ ] check object type
//  [ ] based on object type
//   determine which fields are editable
//    determine default dropdown value
//  [ ] remove dropdown prop since values will be called
//    by query
//  [ ] remove default dropdown value
//  [ ] maybe remove disableDropdown value since it can be controlled by is editable

function isBox(obj: Box | Item | Move): obj is Box {
  return (obj as Box).move_id !== undefined;
}

function isItem(obj: Item | Item | Move): obj is Item {
  return (obj as Item).box_id !== undefined;
}

export default function Column2({
  canEdit = false,
  disableDropdown = false,
  isFragile = false,
  obj,
  showValues = true,
  updateObj,
  value = 0,
}: CTI) {
  const [isChecked, setIsChecked] = useState(isFragile);
  const [dropdownData, setDropdownData] = useState<PossibleTypeObj[]>([]);
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  value = parseFloat(value?.toFixed(2)) || 0;
  let defaultDropdownValue: string = "";
  let type: string = "";
  let showDropdown = true;

  if (isItem(obj)) {
    type = "item";
    defaultDropdownValue = obj.box_id;
  } else if (isBox(obj)) {
    type = "box";
    defaultDropdownValue = obj.move_id;
  } else {
    type = "move";
  }
  useQuery(type === "item" ? GET_BOXES : GET_MOVES, {
    onCompleted: (data) => {
      // defaultValue was removed in 5.x series.
      // https://github.com/hossein-zare/react-native-dropdown-picker/issues/550#issuecomment-1122804565
      let obj: PossibleTypeObj;
      let dropdownData: PossibleTypeObj[] = [];
      if (type === "item") {
        dropdownData = data.getBoxesByUserId;
        obj = data.getBoxesByUserId.find(
          (obj: Box) => obj?._id === defaultDropdownValue
        );
        setDropdownData(dropdownData);
        setSelected(obj?.name);
      }
      if (type === "box") {
        dropdownData = data.getMovesByUserId;
        obj = data.getMovesByUserId.find(
          (obj: Move) => obj?._id === defaultDropdownValue
        );
        setDropdownData(dropdownData);
        setSelected(obj?.name);
      }
    },
    onError: (error) => console.log(`Query Dropdown Error: ${error.message}`),
  });

  return (
    <View style={styles.column}>
      <View style={styles.text} pointerEvents={!canEdit ? "none" : "auto"}>
        <TextInput
          style={styles.name}
          placeholder={obj.name.slice(0, 20) || "Header"}
          onChangeText={(text) => {
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
            setValue={setSelected}
            value={selected}
            onSelectItem={(item) => {
              console.log("selected", item);
              updateObj((prevState) => {
                return {
                  ...prevState,
                  ...item,
                };
              });
            }}
          />
        ) : (
          showDropdown! && <Text style={styles.dropdown}></Text>
        )}
        <TextInput
          style={styles.description}
          placeholder={
            obj.description?.slice(0, 55) ||
            `${obj.name} description`.slice(0, 55)
          }
          onChangeText={(text) => {
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
