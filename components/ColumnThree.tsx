import React, { useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation } from "@apollo/client";

import { GET_ITEMS, REMOVE_ITEM } from "../graphql/item";
import { GET_MOVES, REMOVE_MOVE } from "../graphql/move";
import { GET_BOXES, REMOVE_BOX } from "../graphql/box";
import { Icon, NavIcons } from "../constants/Icon";

import COLORS from "../constants/Colors";
import ROUTES from "../constants/Routes";
import Row from "./Row";

interface ColumnThree<T> {
  disableDropdown?: boolean;
  dropdown: object[];
  listView: string;
  iconType: NavIcons;
  obj?: T | unknown;
  objKey?: string;
  showIcon: boolean;
  type: string;
  rest: object;
}

const formatRoute = {
  box: ROUTES.Boxes,
  item: ROUTES.Items,
  move: ROUTES.Moves,
};

function isItem(obj: any) {
  return "box_id" in obj;
}

function isBox(obj: any) {
  return "move_id" in obj;
}

export default function ColumnThree({
  disableDropdown = true,
  dropdown = [],
  iconType = "dots",
  listView = "home",
  obj = {},
  objKey,
  showIcon = true,
  type,
  rest = {},
}: ColumnThree<typeof obj>) {
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

  const [modalVisible, setModalVisible] = useState({
    actions: false,
    edit: false,
  });
  const navigation = useNavigation();

  const route = useRoute();
  const removeObjectBy = removeBy[route.name];

  let defaultDropdownValueId = undefined;
  if (isItem(obj)) defaultDropdownValueId = obj.box_id;
  if (isBox(obj)) defaultDropdownValueId = obj.move_id;

  return (
    <View style={styles.column}>
      <Modal
        transparent={true}
        visible={modalVisible.edit}
        onRequestClose={() => {
          Alert.alert("Modal Edit closed.");
          setModalVisible((prevState) => ({
            ...prevState,
            edit: !prevState.edit,
          }));
        }}
        style={styles.modalEdit}
      >
        <View style={styles.centerModal}>
          <View style={styles.centeredView2}>
            <Row obj={obj} rest={rest} type={type} />
            {/* <ListItem key={obj._id}>
              <ColumnOne
                badge1={{
                  count: obj.count,
                  type: "box",
                  showType: true,
                }}
              />
              <ColumnTwo
                canEdit={true}
                defaultDropdownValue={defaultDropdownValueId}
                disableDropdown={false}
                description={obj.descripion}
                dropdown={dropdown}
                isFragile={obj.isFragile}
                name={obj.name}
                showDropdown={true}
                showValues={true}
                value={obj.value}
              />
              <ColumnThree
                disableDropdown={false}
                dropdown={dropdown}
                iconType="chevron"
                listView=""
                showIcon={false}
                type={type}
              />
            </ListItem> */}
            <View style={styles.modalView2}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  setModalVisible((prevState) => ({
                    ...prevState,
                    edit: false,
                    actions: false,
                  }))
                }
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  setModalVisible((prevState) => ({
                    ...prevState,
                    edit: false,
                    actions: false,
                  }))
                }
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={modalVisible.actions}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible((prevState) => ({
            ...prevState,
            actions: !prevState.actions,
          }));
        }}
        style={styles.modalAactions}
      >
        <View style={styles.centerModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Icon size={24} type="plusSign" />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  setModalVisible((prevState) => ({
                    ...prevState,
                    actions: false,
                  }))
                }
              >
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
            </View>
            <View style={styles.modalView}>
              <Icon size={24} type="camera" />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>
                  setModalVisible((prevState) => ({
                    ...prevState,
                    actions: false,
                  }))
                }
              >
                <Text style={styles.textStyle}>Camera</Text>
              </Pressable>
            </View>
            <View style={styles.modalView}>
              <Icon size={24} type="delete" />
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
                  setModalVisible((prevState) => ({
                    ...prevState,
                    actions: false,
                  }));
                }}
              >
                <Text style={styles.textStyle}>Delete</Text>
              </Pressable>
            </View>
            <View style={styles.modalView}>
              <Icon size={24} type="edit" />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  // getData();
                  setModalVisible((prevState) => ({
                    edit: true,
                    actions: false,
                  }));
                }}
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
            setModalVisible((prevState) => ({
              ...prevState,
              actions: !prevState.actions,
            }));
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
        {({ pressed }) =>
          showIcon ? <Icon type={iconType} size={16} /> : <></>
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
  modalActions: {
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
