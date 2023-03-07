import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { ColumnThree, PossibleTypeObj } from "../types/types";
import ActionsModal from "./ActionsModal";
import { Icon } from "../constants/Icon";
import COLORS from "../constants/Colors";
// import EditModal from "./EditModal";

export default function Column3(column3: ColumnThree<PossibleTypeObj>) {
  const [modalVisible, setModalVisible] = useState({
    actionsModal: false,
    editModal: false,
  });

  return (
    <View style={styles.column}>
      <ActionsModal
        // deleteObj={deleteObj}
        modalVisible={modalVisible}
        obj={column3}
        setModalVisible={setModalVisible}
      />

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

// <ActionsModal
//   // deleteObj={deleteObj}
//   modalVisible={modalVisible}
//   obj={obj}
//   setModalVisible={setModalVisible}
// />
// <EditModal
//   modalVisible={modalVisible}
//   obj={obj}
//   setModalVisible={setModalVisible}
//   // updateObj={updateObj}
// />

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
