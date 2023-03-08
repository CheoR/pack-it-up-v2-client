import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ConfirmCancel as CCI } from "../types/types";

export default function ConfirmCancel({
  children,
  parentModalVisible,
  parentSetModalVisiible,
}: CCI) {
  // const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.column}>
      {children}
      <View>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            // setModalVisible((prevState) => !prevState);
            parentSetModalVisiible((prevState) => ({
              ...prevState,
              actionsModal: false,
              showConfirmCancel: false,
            }));
          }}
        >
          <Text style={styles.textStyle}>Confirm</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            // setModalVisible((prevState) => !prevState);
            parentSetModalVisiible((prevState) => ({
              ...prevState,
              actionsModal: false,
              showConfirmCancel: false,
            }));
          }}
        >
          <Text style={styles.textStyle}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    height: "100%",
    width: "100%",
    paddingVertical: 100,
    justifyContent: "space-around",
    backgroundColor: "red",
    alignItems: "center",
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 8,
    textTransform: "capitalize",
  },
});
