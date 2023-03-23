import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ModalOption as MOI } from "../types/types";
import { Icon } from "../constants/Icon";
import COLORS from "../constants/Colors";

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
        style={({ pressed }) => [
          styles.button,
          styles.buttonClose,
          {
            backgroundColor: pressed
              ? COLORS.light.action
              : COLORS.light.background,
          },
        ]}
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
        <Text style={styles.text}>{text}</Text>
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
    backgroundColor: COLORS.light.background,
  },
  modalView: {
    margin: 5,
    backgroundColor: COLORS.light.tabIconDefault,
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
  text: {
    color: COLORS.light.text,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 8,
    textTransform: "capitalize",
  },
});
