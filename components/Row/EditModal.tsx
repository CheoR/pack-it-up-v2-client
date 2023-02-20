import React, { useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";

import ModalOption from "./ModalOption";
import Row3 from "./Row3";

interface EditModal<Obj, C, M> {
  columns: C;
  modalVisible: M;
  obj: Obj;
  setModalVisible: any;
  updateObj: () => void;
}
export default function EditModal({
  columns,
  modalVisible,
  obj,
  setModalVisible,
  updateObj,
}: EditModal<typeof obj, typeof columns, typeof modalVisible>) {
  const [formData, setFormData] = useState({
    ...obj,
  });
  return (
    <Modal
      transparent={true}
      visible={modalVisible.editModal}
      onRequestClose={() => {
        Alert.alert("EditModal closed.");
        setModalVisible((prevState) => ({
          ...prevState,
          editModal: !prevState.editModal,
        }));
      }}
      style={styles.modalEdit}
    >
      <View style={styles.centerModal}>
        <View style={styles.centeredView}>
          <Row3
            column1={{ ...columns }}
            column2={{
              ...columns,
              canEdit: true,
              disableDropdown: true,
              updateObj: setFormData,
              obj: obj,
            }}
            column3={{
              ...columns,
              showIcon: false,
              obj: obj,
            }}
          />

          <View style={styles.modalView2}>
            <ModalOption
              text="confirm"
              optionalFunc={updateObj}
              optionalFuncExtras={{
                variables: {
                  input: {
                    _id: obj._id,
                    ...obj,
                    ...formData,
                  },
                },
              }}
              setState={setModalVisible}
              setStateExtras={{
                editModal: false,
                actionsModal: false,
              }}
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() =>
                setModalVisible((prevState) => ({
                  ...prevState,
                  editModal: false,
                  actionsModal: false,
                }))
              }
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

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
  modalView2: {
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
