import React from "react";
import { Alert, Modal, View, StyleSheet } from "react-native";

import { ActionsModal as AMI } from "../../types/types";
import ModalOption from "./ModalOption";

export default function ActionsModal({
  deleteObj,
  modalVisible,
  obj,
  setModalVisible,
}: AMI) {
  return (
    <Modal
      transparent={true}
      visible={modalVisible.actionsModal}
      onRequestClose={() => {
        Alert.alert("ActionModal closed.");
        setModalVisible((prevState) => ({
          ...prevState,
          actionsModal: !prevState.actionsModal,
        }));
      }}
      style={styles.actionsModal}
    >
      <View style={styles.centerModal}>
        <View style={styles.centeredView}>
          <ModalOption
            iconType="plusSign"
            text="add"
            setState={setModalVisible}
            setStateExtras={{
              actionsModal: false,
            }}
          />

          <ModalOption
            iconType="camera"
            text="camera"
            setState={setModalVisible}
            setStateExtras={{
              actionsModal: false,
            }}
          />
          <ModalOption
            iconType="delete"
            text="delete"
            optionalFunc={deleteObj}
            optionalFuncExtras={{
              variables: {
                input: {
                  _id: obj._id,
                },
              },
            }}
            setState={setModalVisible}
            setStateExtras={{
              actionsModal: false,
            }}
          />
          <ModalOption
            iconType="edit"
            text="edit"
            setState={setModalVisible}
            setStateExtras={{
              editModal: true,
              actionsModal: false,
            }}
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
