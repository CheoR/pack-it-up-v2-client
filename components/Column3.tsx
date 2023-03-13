import React, { useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { DocumentNode, useMutation } from "@apollo/client";

import { GET_ITEMS, REMOVE_ITEM } from "../graphql/item";
import { GET_MOVES, REMOVE_MOVE } from "../graphql/move";
import { GET_BOXES, REMOVE_BOX } from "../graphql/box";
import { isBox, isItem } from "../utils/utils";
import ConfirmCancel from "./ConfirmCancel";
import { Icon } from "../constants/Icon";
import COLORS from "../constants/Colors";
import ModalOption from "./ModalOption";
import Row from "./Row";
import {
  ColumnOne,
  ColumnThree,
  ColumnTwo,
  PossibleTypeObj,
} from "../types/types";
import {
  defaultListViewIconOptions,
  defaultListViewIsEditable,
} from "../constants/Defaults";

function removeInvalidFieldsForObjType(obj: Omit<PossibleTypeObj, "Home">) {
  let filtered;

  if (isItem(obj)) {
    filtered = Object.keys(obj)
      .filter((key) => defaultUpdateItem.includes(key))
      .reduce((acc, key) => {
        return {
          ...acc,
          [key]: obj[key as keyof typeof obj],
        };
      }, {});
  } else if (isBox(obj)) {
    filtered = Object.keys(obj)
      .filter((key) => defaultUpdateBox.includes(key))
      .reduce((acc, key) => {
        return {
          ...acc,
          [key]: obj[key as keyof typeof obj],
        };
      }, {});
  } else {
    filtered = Object.keys(obj)
      .filter((key) => defaultUpdateMove.includes(key))
      .reduce((acc, key) => {
        return {
          ...acc,
          [key]: obj[key as keyof typeof obj],
        };
      }, {});
  }

  return {
    ...filtered,
  };
}

export default function Column3(column3: ColumnThree<PossibleTypeObj>) {
  let REMOVE_OBJ: DocumentNode;
  let UPDATE_OBJ: DocumentNode;

  let column1: ColumnOne = {
    ...column3,
    ...defaultListViewIconOptions,
  };
  let column2: ColumnTwo<PossibleTypeObj> = {
    ...column3,
    ...defaultListViewIsEditable,
    canEdit: true,
  };

  let c3: ColumnThree<PossibleTypeObj> = {
    ...column3,
    ...defaultListViewIconOptions,
    showIcon: false,
  };

  const [modalVisible, setModalVisible] = useState({
    actionsModal: false,
    edit: false,
    delete: false,
    editModal: false,
    showConfirmCancel: false,
  });

  if (isItem(column3)) {
    MUTATION = REMOVE_ITEM;
  } else if (isBox(column3)) {
    MUTATION = REMOVE_BOX;
  } else {
    MUTATION = REMOVE_MOVE;
  }

  const [removeObj] = useMutation(MUTATION, {
    refetchQueries: [
      {
        query: GET_ITEMS,
      },
      {
        query: GET_BOXES,
      },
      {
        query: GET_MOVES,
      },
      "GetHomeData",
    ],
    onError: (error) => {
      console.log(`Create Item Error: ${error.message}`);
    },
  });

  return (
    <View style={styles.column}>
      <Modal
        transparent={true}
        visible={modalVisible.delete}
        onRequestClose={() => {
          Alert.alert("delete closed.");
          setModalVisible((prevState) => ({
            ...prevState,
            actionsModal: false,
            delete: false,
          }));
        }}
        style={styles.actionsModal}
      >
        <View style={styles.centerModal}>
          <View style={styles.confirmCancel}>
            <ConfirmCancel
              parentModalVisible={modalVisible}
              parentSetModalVisiible={setModalVisible}
              mutation={() =>
                removeObj({
                  variables: {
                    input: {
                      _id: column3._id,
                    },
                  },
                })
              }
            >
              <Text>are you sure you want to delete?</Text>
              <Row
                column1={column1}
                column2={{ ...column2, canEdit: false }}
                column3={c3}
              />
            </ConfirmCancel>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={modalVisible.showConfirmCancel}
        onRequestClose={() => {
          Alert.alert("confirmCancel closed.");
          setModalVisible((prevState) => ({
            ...prevState,
            actionsModal: false,
            showConfirmCancel: false,
          }));
        }}
        style={styles.actionsModal}
      >
        <View style={styles.centerModal}>
          <View style={styles.confirmCancel}>
            <ConfirmCancel
              parentModalVisible={modalVisible}
              parentSetModalVisiible={setModalVisible}
            >
              <Row column1={column1} column2={column2} column3={c3} />
            </ConfirmCancel>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={modalVisible.edit}
        onRequestClose={() => {
          Alert.alert("edit closed.");
          setModalVisible((prevState) => ({
            ...prevState,
            edit: false,
          }));
        }}
        style={styles.actionsModal}
      >
        <View style={styles.centerModal}>
          <View style={styles.confirmCancel}>
            <ConfirmCancel
              parentModalVisible={modalVisible}
              parentSetModalVisiible={setModalVisible}
              mutation={() => {
                const cleanedFields = removeInvalidFieldsForObjType(formFields);
                updateObj({
                  variables: {
                    input: {
                      ...cleanedFields,
                    },
                  },
                });
              }}
            >
              <Row
                column1={column1}
                column2={{
                  ...column2,
                  canEdit: true,
                  setFormFields,
                }}
                column3={c3}
              />
            </ConfirmCancel>
          </View>
        </View>
      </Modal>

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
              iconType="plusSign"
              text="add"
              iconSize={24}
              obj={column3}
              parentModalVisible={modalVisible}
              parentSetModalVisiible={setModalVisible}
            />

            <ModalOption
              iconType="camera"
              text="camera"
              iconSize={24}
              obj={column3}
              parentModalVisible={modalVisible}
              parentSetModalVisiible={setModalVisible}
            />
            <ModalOption
              iconType="delete"
              text="delete"
              iconSize={24}
              obj={column3}
              parentModalVisible={modalVisible}
              parentSetModalVisiible={setModalVisible}
            />
            <ModalOption
              iconSize={24}
              iconType="edit"
              obj={column3}
              parentModalVisible={modalVisible}
              parentSetModalVisiible={setModalVisible}
              text="edit"
            />
          </View>
        </View>
      </Modal>
      <Pressable
        onPress={() => {
          console.log("dots button pressable pressed");
          setModalVisible((prevState) => ({
            ...prevState,
            actionsModal: !prevState.actionsModal,
          }));
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
          column3.showIcon ? (
            <Icon type={column3.iconType || "dots"} size={16} />
          ) : (
            <></>
          )
        }
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  actionsModal: {
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
  confirmCancel: {
    height: "100%",
    width: "100%",
    backgroundColor: "lightgray",
  },
  modalactionsModal: {
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
