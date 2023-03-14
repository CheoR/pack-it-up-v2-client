import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useMutation, useQuery } from "@apollo/client";
import Checkbox from "expo-checkbox";

import { GET_MOVES, GET_MOVES_DROPDOWN, UPDATE_MOVE } from "../graphql/move";
import { GET_BOXES, GET_BOXES_DROPDOWN, UPDATE_BOX } from "../graphql/box";
import { GET_ITEMS, UPDATE_ITEM } from "../graphql/item";
import { isBox, isItem, isHome } from "../utils/utils";
import COLORS from "../constants/Colors";
import {
  Box,
  ColumnTwo,
  EditableFields,
  isEditabe,
  Item,
  Move,
  PossibleTypeObj,
} from "../types/types";

const editable = {
  box: {
    description: "",
    name: "",
    move_id: "",
    showDropdown: true,
  },
  item: {
    box_id: "",
    description: "",
    isFragile: false,
    name: "",
    value: 0,
    showDropdown: true,
  },
  move: {
    name: "",
    description: "",
    showDropdown: false,
  },
};

const editableFields: EditableFields = {
  box: {
    canEdit: false,
    disableDropdown: true,
    showDropdown: true,
    showValues: true,
  },
  default: {
    canEdit: false,
    disableDropdown: true,
    showDropdown: true,
    showValues: true,
  },
  home: {
    canEdit: false,
    disableDropdown: true,
    showDropdown: false,
    showValues: false,
  },
  item: {
    canEdit: false,
    disableDropdown: true,
    showDropdown: true,
    showValues: true,
  },
  move: {
    canEdit: false,
    disableDropdown: true,
    showDropdown: false,
    showValues: true,
  },
};

const nonEditableFields: EditableFields = {
  box: {
    canEdit: false,
    disableDropdown: true,
    showDropdown: true,
    showValues: true,
  },
  default: {
    canEdit: false,
    disableDropdown: true,
    showDropdown: true,
    showValues: true,
  },
  home: {
    canEdit: false,
    disableDropdown: true,
    showDropdown: false,
    showValues: false,
  },
  item: {
    canEdit: false,
    disableDropdown: true,
    showDropdown: true,
    showValues: true,
  },
  move: {
    canEdit: false,
    disableDropdown: true,
    showDropdown: false,
    showValues: true,
  },
};
export default function Column2(column2: ColumnTwo<PossibleTypeObj>) {
  const [isChecked, setIsChecked] = useState(column2.isFragile);
  const [dropdownData, setDropdownData] = useState<PossibleTypeObj[]>([]);
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  let defaultDropdownValue: string = "";
  let MUTATION;
  let QUERY;
  let type: string = "default";

  let isEditable = editableFields[type as keyof EditableFields];

  if (isItem(column2)) {
    type = "item";
    defaultDropdownValue = column2.box_id;
    MUTATION = UPDATE_ITEM;
    QUERY = GET_BOXES_DROPDOWN;
  } else if (isBox(column2)) {
    type = "box";
    defaultDropdownValue = column2.move_id;
    MUTATION = UPDATE_BOX;
    QUERY = GET_MOVES_DROPDOWN;
  } else if (isHome(column2)) {
    type = "home";
    MUTATION = UPDATE_MOVE;
    QUERY = GET_MOVES_DROPDOWN;
  } else {
    type = "move";
    MUTATION = UPDATE_MOVE;
    QUERY = GET_MOVES_DROPDOWN;
  }

  // TODO: FLIP FLAGS TO MAKE MORE READABLE
  if (!column2.canEdit) {
    isEditable = editableFields[type as keyof EditableFields];
  }

  useQuery(QUERY, {
    onCompleted: (data) => {
      // defaultValue was removed in 5.x series.
      // https://github.com/hossein-zare/react-native-dropdown-picker/issues/550#issuecomment-1122804565
      let obj: PossibleTypeObj;
      let dropdownData: PossibleTypeObj[] = [];
      if (type === "item") {
        dropdownData = data.getBoxesByUserId as Item[];
        obj = data.getBoxesByUserId.find(
          (obj: Box) => obj?._id === defaultDropdownValue
        );
        setDropdownData(dropdownData);
        setSelected(obj?.name);
      }
      if (type === "box") {
        dropdownData = data.getMovesByUserId as Move[];
        obj = data.getMovesByUserId.find(
          (obj: Move) => obj?._id === defaultDropdownValue
        );
        setDropdownData(dropdownData);
        setSelected(obj?.name);
      }
    },
    onError: (error) => console.log(`Query Dropdown Error: ${error.message}`),
  });

  // const [updateObj] = useMutation(MUTATION, {
  //   refetchQueries: [
  //     {
  //       query: GET_ITEMS,
  //     },
  //     {
  //       query: GET_BOXES,
  //     },
  //     {
  //       query: GET_MOVES,
  //     },
  //     "GetHomeData",
  //   ],
  //   onError: (error) => {
  //     console.log(`Create Item Error: ${error.message}`);
  //   },
  // });
  return (
    <View style={styles.column}>
      <View
        style={styles.text}
        pointerEvents={!column2.canEdit ? "none" : "auto"}
      >
        <TextInput
          style={styles.name}
          placeholder={column2.name.slice(0, 20) || "Header"}
          onChangeText={(text) => {
            // TODO: refactor
            column2?.setFormFields &&
              column2?.setFormFields((prevState) => {
                return {
                  ...prevState,
                  name: text,
                };
              });
          }}
        />
        {column2.showDropdown && dropdownData?.length ? (
          <DropDownPicker
            disabled={!column2.disableDropdown}
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
              backgroundColor: column2.disableDropdown
                ? "lightgray"
                : COLORS.light.background,
            }}
            setValue={setSelected}
            value={selected}
            onSelectItem={(item) => {
              console.log("selected", item);
              // updateObj((prevState) => {
              //   return {
              //     ...prevState,
              //     ...item,
              //   };
              // });
            }}
          />
        ) : (
          isEditable.showDropdown! && <Text style={styles.dropdown}></Text>
        )}
        <TextInput
          style={styles.description}
          multiline={true}
          placeholder={
            column2?.description?.slice(0, dropdownData?.length ? 65 : 100) ||
            `${column2.name} description`.slice(
              0,
              dropdownData?.length ? 65 : 100
            )
          }
          onChangeText={(text) => {
            // TODO: refactor
            column2?.setFormFields &&
              column2?.setFormFields((prevState) => {
                return {
                  ...prevState,
                  description: text,
                };
              });
          }}
        />
      </View>
      {column2.showValues && (
        <View
          style={styles.values}
          pointerEvents={!column2.canEdit ? "none" : "auto"}
        >
          {/* TODO: swap out checkbox and remove from packages */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              // onValueChange={() => {
              //   setIsChecked((prevState) => {
              //     updateObj((prevState) => {
              //       console.log(
              //         `prevState: ${prevState} new state: ${!prevState}`
              //       );
              //       return {
              //         ...prevState,
              //         isFragile: !prevState,
              //       };
              //     });

              //     return !prevState;
              //   });
              // }}
              disabled={!column2.canEdit} // true => isDisabled = false
              color={isChecked ? COLORS.light.action : undefined}
            />
            <Text style={styles.label}>Fragile</Text>
          </View>
          <TextInput
            style={styles.value}
            placeholder={`$${parseFloat(column2?.value?.toFixed(2)) || 0.0}`}
            // onChangeText={(text) => {
            //   updateObj((prevState) => {
            //     return {
            //       ...prevState,
            //       value: Number(text),
            //     };
            //   });
            // }}
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
