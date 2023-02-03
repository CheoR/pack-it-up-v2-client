import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";

import { GET_ITEMS } from "../screens/Items";
import { GET_BOXES } from "../screens/Boxes";
import { GET_MOVES } from "../screens/Moves";
import COLORS from "../constants/Colors";
import ROUTES from "../constants/Routes";

const icons = {
  chevron: (
    <MaterialCommunityIcons
      name="chevron-right"
      size={16}
      color={COLORS.light.tint}
    />
  ),
  dots: (
    <MaterialCommunityIcons
      name="dots-vertical"
      size={16}
      color={COLORS.light.tint}
    />
  ),
  none: <></>,
};

const formatRoute = {
  box: ROUTES.Boxes,
  item: ROUTES.Items,
  move: ROUTES.Moves,
};

const REMOVE_ITEM = gql`
  mutation RemoveItem($input: ItemIdInput!) {
    removeItem(input: $input) {
      ok
    }
  }
`;

const REMOVE_BOX = gql`
  mutation RemoveBox($input: BoxIdInput!) {
    removeBox(input: $input) {
      ok
    }
  }
`;

const REMOVE_MOVE = gql`
  mutation RemoveMove($input: MoveIdInput!) {
    removeMove(input: $input) {
      ok
    }
  }
`;

export default function ColumnThree({
  listView = "home",
  iconType = "dots",
  objKey,
  showIcon = true,
}) {
  const [removeItem] = useMutation(REMOVE_ITEM, {
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

  const [removeBox] = useMutation(REMOVE_BOX, {
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
      console.log(`Create Box Error: ${error.message}`);
    },
  });
  const [removeMove] = useMutation(REMOVE_MOVE, {
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
      console.log(`Create Move Error: ${error.message}`);
    },
  });

  const removeBy = {
    Items: removeItem,
    Boxes: removeBox,
    Moves: removeMove,
  };

  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const route = useRoute();
  console.log(`current route is ${route.name}`);
  const removeObjectBy = removeBy[route.name];

  return (
    <View style={styles.column}>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible((prevState) => !prevState);
        }}
        style={styles.modal}
      >
        <View style={styles.centerModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <MaterialCommunityIcons
                name="plus"
                size={24}
                color={COLORS.light.tint}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible((prevState) => !prevState)}
              >
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
            </View>
            <View style={styles.modalView}>
              <MaterialCommunityIcons
                name="camera-outline"
                size={24}
                color={COLORS.light.tint}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible((prevState) => !prevState)}
              >
                <Text style={styles.textStyle}>Camera</Text>
              </Pressable>
            </View>
            <View style={styles.modalView}>
              <MaterialCommunityIcons
                name="delete-outline"
                size={24}
                color={COLORS.light.tint}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  // TODO: figure out which to call here
                  removeObjectBy({
                    variables: {
                      input: {
                        _id: objKey,
                      },
                    },
                  });
                  setModalVisible((prevState) => !prevState);
                }}
              >
                <Text style={styles.textStyle}>Delete</Text>
              </Pressable>
            </View>
            <View style={styles.modalView}>
              <MaterialCommunityIcons
                name="square-edit-outline"
                size={24}
                color={COLORS.light.tint}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible((prevState) => !prevState)}
              >
                <Text style={styles.textStyle}>Edit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        onPress={() => {
          if (listView === "home") {
            navigation.navigate(formatRoute[listView]);
          } else {
            setModalVisible((prevState) => !prevState);
          }
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? COLORS.light.action
              : COLORS.light.background,
          },
        ]}
      >
        {
          ({ pressed }) =>
            // {
            showIcon ? icons[iconType] : <></>
          // }
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
  modal: {
    backgroundColor: "blue",
    marginLeft: 50,
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
