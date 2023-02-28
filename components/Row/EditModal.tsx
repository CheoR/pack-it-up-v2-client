import React, { useState } from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";

import { EditModal as EMI } from "../../types/types";
import ModalOption from "./ModalOption";
import Row3 from "./Row3";

export default function EditModal({
  columns,
  modalVisible,
  obj,
  setModalVisible,
  updateObj,
}: EMI) {
  const [formData, setFormData] = useState({});
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
            column1={{
              badge1: {
                type: columns?.column1.badge1.type || "none",
                count: columns?.column1.badge1.count,
                size: columns?.column1.badge1.size,
                showType: columns?.column1.badge1.showType,
              },
              badge2: {
                type: columns?.column1.badge2?.type || "none",
                count: columns?.column1.badge2?.count,
                size: columns?.column1.badge2?.size,
                showType: columns?.column1.badge2?.showType,
              },
            }}
            column2={{
              ...columns?.column2,
              canEdit: true,
              obj: obj,
            }}
            column3={{
              showIcon: false,
            }}
          />

          <View style={styles.modalView}>
            <ModalOption
              text="confirm"
              optionalFunc={updateObj}
              // optionalFuncExtras={{
              //   variables: {
              //     input: {
              //       ...obj,
              //       ...formData,
              //       _id: obj._id,
              //     },
              //   },
              // }}
              optionalFuncExtras={() => {
                let input;

                if (obj.name === "item") {
                  input = {
                    ...obj,
                    ...formData,
                    _id: obj._id,
                  };
                  delete input.count;
                  delete input.move_id;
                  delete input.__typename;
                } else {
                  input = {
                    ...obj,
                    ...formData,
                    _id: obj._id,
                  };
                }
                console.log(`\n\n**** this is input`);
                console.log(input);
                console.log(`******\n\n`);
                return {
                  variables: {
                    input,
                  },
                };
              }}
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
