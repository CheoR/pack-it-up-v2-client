import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Option as OI } from "../../types/types";
import { Icon } from "../../constants/Icon";

export default function ModalOption({
  iconSize = 24,
  iconType = "none",
  optionalFunc,
  optionalFuncExtras = {},
  setState,
  text,
  setStateExtras,
}: OI) {
  return (
    <View style={styles.modalView}>
      <Icon size={iconSize} type={iconType} />
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => {
          if (optionalFunc !== undefined) {
            delete optionalFuncExtras?.input?.count;
            delete optionalFuncExtras?.variables?.input?.move_id;
            console.log(`\n\n============ this is what i'm eneidn back`);
            console.log(optionalFuncExtras);
            console.log(`=========\n\n`);
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
