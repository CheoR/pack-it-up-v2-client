import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ModalOption as MOI } from "../types/types";
import { Icon } from "../constants/Icon";

export default function ModalOption({
  iconSize = 24,
  iconType = "none",
  parentSetModalVisiible,
  text,
}: MOI) {
  return (
    <View style={styles.modalView}>
      <Icon size={iconSize} type={iconType} />
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => {
          parentSetModalVisiible((prevState) => {
            return {
              ...prevState,
              actionsModal: false,
              [text]: true,
            };
          });
        }}
      >
        <Text style={styles.textStyle}>{text}</Text>
      </Pressable>
    </View>
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
