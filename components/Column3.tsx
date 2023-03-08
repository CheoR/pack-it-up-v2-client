import React, { useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, View } from "react-native";

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

export default function Column3(column3: ColumnThree<PossibleTypeObj>) {
  const [modalVisible, setModalVisible] = useState({
    actionsModal: false,
    editModal: false,
    showConfirmCancel: false,
  });

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
  return (
    <View style={styles.column}>
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
            // actionsModal: !prevState.actionsModal,
            showConfirmCancel: true,
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
