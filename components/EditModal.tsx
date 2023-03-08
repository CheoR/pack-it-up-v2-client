import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, View } from "react-native";

// import ModalOption from "./ModalOption";
import Row from "./Row";
import {
  defaultListViewIconOptions,
  defaultListViewIsEditable,
} from "../constants/Defaults";
import {
  ColumnOne,
  ColumnThree,
  ColumnTwo,
  isEditabe,
  EditModal as EMI,
  PossibleTypeObj,
} from "../types/types";
// const isEditable: isEditabe = {
//   canEdit: true,
//   disableDropdown: true,
//   showDropdown: true,
//   showValues: true,
// };

export default function EditModal({ modalVisible, obj, setModalVisible }: EMI) {
  const [formData, setFormData] = useState({});

  let column1: ColumnOne = {
    ...obj,
    ...defaultListViewIconOptions,
  };

  let column2: ColumnTwo<PossibleTypeObj> = {
    ...obj,
    ...defaultListViewIsEditable,
    canEdit: true,
  };

  let column3: ColumnThree<PossibleTypeObj> = {
    ...obj,
    showIcon: false,
  };

  return (
    <Modal
      onRequestClose={() => {
        Alert.alert("EditModal closed.");
        setModalVisible((prevState) => ({
          ...prevState,
          editModal: true,
        }));
      }}
      style={styles.modalEdit}
      transparent={true}
      visible={modalVisible.editModal}
    >
      <View style={styles.centerModal}>
        <View style={styles.centeredView}>
          <Row column1={column1} column2={column2} column3={column3} />

          <View style={styles.modalView}>
            <View>
              <Text>moo</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// <ModalOption
// text="confirm"
// optionalFunc={updateObj}
// optionalFuncExtras={{
//   variables: {
//     input: {
//       ...obj,
//       ...formData,
//       _id: obj._id,
//     },
//   },
// }}
// optionalFuncExtras={() => {
//   let input;

//   if (obj.name === "item") {
//     input = {
//       ...obj,
//       ...formData,
//       _id: obj._id,
//     };
//     delete input.count;
//     delete input.move_id;
//     delete input.__typename;
//   } else {
//     input = {
//       ...obj,
//       ...formData,
//       _id: obj._id,
//     };
//   }
//   console.log(`\n\n**** this is input`);
//   console.log(input);
//   console.log(`******\n\n`);
//   return {
//     variables: {
//       input,
//     },
//   };
// }}
//   setState={setModalVisible}
//   setStateExtras={{
//     editModal: false,
//     actionsModal: false,
//   }}
// />

// <ModalOption
//   text="cancel"
// parentSetModalVisiible={setModalVisible}
// setStateExtras={{
//   editModal: false,
//   actionsModal: false,
// }}
// />
const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    width: 100,
    backgroundColor: "#2196F3",
  },
  centerModal: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  modalEdit: {
    backgroundColor: "yellow",
  },
  modalView: {
    margin: 5,
    backgroundColor: "red",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // flexDirection: "row",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 8,
  },
});
