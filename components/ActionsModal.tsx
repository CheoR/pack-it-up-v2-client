import React from "react";
import { Alert, Modal, View, StyleSheet, Text } from "react-native";

import { ActionsModal as AMI } from "../types/types";
import ConfirmCancel from "./ConfirmCancel";
import EditModal from "./EditModal";
import ModalOption from "./ModalOption";

export default function ActionsModal({
  modalVisible,
  obj,
  setModalVisible,
}: AMI) {
  <EditModal
    modalVisible={modalVisible}
    obj={obj}
    setModalVisible={setModalVisible}
  />;
  return (
    <Modal
      transparent={true}
      visible={modalVisible.actionsModal}
      onRequestClose={() => {
        Alert.alert("ActionModal closed.");
        setModalVisible((prevState) => ({
          ...prevState,
          actionsModal: false,
        }));
      }}
      style={styles.actionsModal}
    >
      <View style={styles.centerModal}>
        <View style={styles.centeredView}>
          <ModalOption
            iconSize={24}
            iconType="edit"
            obj={obj}
            parentModalVisible={modalVisible}
            parentSetModalVisiible={setModalVisible}
            text="edit"
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centerModal: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    height: 320,
    width: 160,
    borderRadius: 5,
  },
  actionsModal: {
    backgroundColor: "blue",
    marginLeft: 50,
  },
});

// <ModalOption
//   iconType="plusSign"
//   text="add"
//   setState={setModalVisible}
//   setStateExtras={{
//     actionsModal: false,
//   }}
// />

// <ModalOption
//   iconType="camera"
//   text="camera"
//   setState={setModalVisible}
//   setStateExtras={{
//     actionsModal: false,
//   }}
// />
// <ModalOption
//   iconType="delete"
//   text="delete"
//   // optionalFunc={deleteObj}
//   optionalFuncExtras={{
//     variables: {
//       input: {
//         _id: obj._id,
//       },
//     },
//   }}
//   setState={setModalVisible}
//   setStateExtras={{
//     actionsModal: false,
//   }}
// />
// <ModalOption
//   iconType="edit"
//   text="edit"
//   setState={setModalVisible}
//   setStateExtras={{
//     editModal: true,
//     actionsModal: false,
//   }}
// />
