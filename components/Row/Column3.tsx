import React, { useState } from "react";

import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Icon, NavIcons } from "../../constants/Icon";
import COLORS from "../../constants/Colors";

import Row2 from "./Row2";

interface ColumnThree<T> {
  disableDropdown?: boolean;
  dropdown: object[];
  listView?: string;
  iconType?: NavIcons;
  obj?: T;
  showIcon: boolean;
  type: string;
  rest: object;
  columns: object;
  deleteObj: ({}) => void;
  updateObj: ({}) => void;
}

export default function Column3({
  iconType = "dots",
  obj,
  listView = "home",
  showIcon = true,
  deleteObj,
  updateObj,
  columns,
}: ColumnThree<typeof obj>) {
  const [modalVisible, setModalVisible] = useState({
    actions: false,
    edit: false,
  });
  const [formData, setFormData] = useState({});

  return (
    <View style={styles.column}>
      <Modal
        transparent={true}
        visible={modalVisible.edit}
        onRequestClose={() => {
          Alert.alert("Modal Edit closed.");
          setModalVisible((prevState) => ({
            ...prevState,
            edit: !prevState.edit,
          }));
        }}
        style={styles.modalEdit}
      >
        <View style={styles.centerModal}>
          <View style={styles.centeredView2}>
            <Row2
              column1={{ ...columns }}
              column2={{
                ...columns,
                canEdit: true,
                disableDropdown: true,
                updateObj: setFormData,
              }}
              column3={{ showIcon: false }}
            />
            <View style={styles.modalView2}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  console.log(`formData`);
                  console.log(formData);
                  updateObj({
                    variables: {
                      input: {
                        _id: obj._id,
                        box_id: "63d58f28e9c4ff10994a0dca",
                        ...formData,
                      },
                    },
                  });
                  setModalVisible((prevState) => ({
                    ...prevState,
                    edit: false,
                    actions: false,
                  }));
                }}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  setModalVisible((prevState) => ({
                    ...prevState,
                    edit: false,
                    actions: false,
                  }))
                }
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={modalVisible.actions}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible((prevState) => ({
            ...prevState,
            actions: !prevState.actions,
          }));
        }}
        style={styles.modalActions}
      >
        <View style={styles.centerModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Icon size={24} type="plusSign" />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  setModalVisible((prevState) => ({
                    ...prevState,
                    actions: false,
                  }))
                }
              >
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
            </View>
            <View style={styles.modalView}>
              <Icon size={24} type="camera" />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  setModalVisible((prevState) => ({
                    ...prevState,
                    actions: false,
                  }))
                }
              >
                <Text style={styles.textStyle}>Camera</Text>
              </Pressable>
            </View>
            <View style={styles.modalView}>
              <Icon size={24} type="delete" />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  deleteObj({
                    variables: {
                      input: {
                        _id: obj._id,
                      },
                    },
                  });
                  setModalVisible((prevState) => ({
                    ...prevState,
                    actions: false,
                  }));
                }}
              >
                <Text style={styles.textStyle}>Delete</Text>
              </Pressable>
            </View>
            <View style={styles.modalView}>
              <Icon size={24} type="edit" />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  // getData();
                  setModalVisible((prevState) => ({
                    edit: true,
                    actions: false,
                  }));
                }}
              >
                <Text style={styles.textStyle}>Edit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        onPress={() => {
          setModalVisible((prevState) => ({
            ...prevState,
            actions: !prevState.actions,
          }));
          // }
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? COLORS.light.action
              : COLORS.light.background,
          },
        ]}
      >
        {({ pressed }) =>
          showIcon ? <Icon type={iconType} size={16} /> : <></>
        }
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    height: 150,
    width: 700,
    backgroundColor: "pink",
  },
  column: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: 40,
  },
  centerModal: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: "orange", //
    height: 320,
    width: 160,
    borderRadius: 5,
  },
  centeredView2: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: "green", //
    // height: 320,
    // width: 160,
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  modalActions: {
    backgroundColor: "blue",
    marginLeft: 50,
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
    flexDirection: "row",
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 8,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
