import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ConfirmCancel as CCI } from "../types/types";
import { makeFalse as MFT } from "../types/types";
import COLORS from "../constants/Colors";

function makeFalse<T extends {}>(obj: T): MFT<T> {
  const allFalse = Object.fromEntries(
    Object.keys(obj).map((key: string) => [key, false])
  ) as MFT<T>;

  return allFalse;
}

export default function ConfirmCancel({
  children,
  mutation,
  parentSetModalVisiible,
}: CCI) {
  return (
    <View style={styles.column}>
      {children}
      <View style={styles.buttons}>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            if (mutation) {
              mutation();
            }
            parentSetModalVisiible((prevState) => {
              const res = makeFalse(prevState);
              return res;
            });
          }}
        >
          <Text style={styles.text}>confirm</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            parentSetModalVisiible((prevState) => {
              const res = makeFalse(prevState);
              return res;
            });
          }}
        >
          <Text style={styles.text}>cancel</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    height: "100%",
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 100,
    justifyContent: "space-around",
    backgroundColor: COLORS.light.background,
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
    width: 400,
    backgroundColor: COLORS.light.tint,
  },
  buttons: {
    height: 100,
    justifyContent: "space-between",
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
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 8,
    textTransform: "capitalize",
  },
});
