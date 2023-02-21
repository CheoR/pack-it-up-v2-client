import React, { useState } from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";

import ModalOption from "./ModalOption";
import Row3 from "./Row3";

interface EditModal<Obj, C, M> {
  columns: C;
  modalVisible: M;
  obj: Obj;
  setModalVisible: ({}) => void;
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
      onRequestClose={() => {
        Alert.alert("EditModal closed.");
        setModalVisible((prevState) => ({
          ...prevState,
          editModal: !prevState.editModal,
        }));
      }}
      style={styles.modalEdit}
      transparent={true}
      visible={modalVisible.editModal}
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

          <View style={styles.modalView}>
            <ModalOption
              text="confirm"
              optionalFunc={updateObj}
              optionalFuncExtras={{
                variables: {
                  input: {
                    ...obj,
                    ...formData,
                    _id: obj._id,
                  },
                },
              }}
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
              setState={setModalVisible}
              setStateExtras={{
                editModal: false,
                actionsModal: false,
              }}
            />

            <ModalOption
              text="cancel"
              setState={setModalVisible}
              setStateExtras={{
                editModal: false,
                actionsModal: false,
              }}
            />
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
