import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Icon, PossibleIcons, PossibleIconSizes } from "../../constants/Icon";

interface Option {
  iconSize?: PossibleIconSizes;
  iconType?: PossibleIcons;
  optionalFunc?: ({}) => void;
  optionalFuncExtras?: Object;
  setState: ({}) => void;
  setStateExtras: Object;
  text: string;
}

export default function ModalOption({
  iconSize = 24,
  iconType = "none",
  optionalFunc,
  optionalFuncExtras = {},
  setState,
  text,
  setStateExtras,
}: Option) {
  return (
    <View style={styles.modalView}>
      <Icon size={iconSize} type={iconType} />
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => {
          if (optionalFunc !== undefined) {
            optionalFunc(optionalFuncExtras);
          }
          setState((prevState) => ({
            ...prevState,
            ...setStateExtras,
          }));
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
