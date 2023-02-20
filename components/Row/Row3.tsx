import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { Badge as BadgeType } from "../Badge";
import COLORS from "../../constants/Colors";
import { Icon } from "../../constants/Icon";
import ActionsModal from "./ActionsModal";
import EditModal from "./EditModal";
import Column1 from "./Column1";
import Column2 from "./Column2";
import Column3 from "./Column3";
import Badge from "../Badge";

interface Badges {
  badge1: BadgeType;
  badge2?: BadgeType;
}

//  Its purpose is to manage business logic and styling.
export default function Row3({ column1, column2, column3 }) {
  const [modalVisible, setModalVisible] = useState({
    actionsModal: false,
    edit: false,
  });
  // console.log(`column3.obj`);
  // console.log(column3.obj);
  return (
    <View style={styles.row}>
      <View style={styles.column1}>
        <Badge
          count={column1.badge1.count}
          size={column1.badge1.size}
          showType={column1.badge1.showType}
          type={column1.badge1.type}
        />
        {column1.badge2 && (
          <Badge
            count={column1.badge2.count}
            size={column1.badge2.size}
            showType={column1.badge2.showType}
            type={column1.badge2.type}
          />
        )}
      </View>
      <View style={styles.column2}>
        <View
          style={styles.text}
          pointerEvents={!column2.canEdit ? "none" : "auto"}
        >
          <TextInput
            style={styles.name}
            placeholder={column2.name?.slice(0, 20) || "Header"}
            onChangeText={(text) => {
              console.log(`text: ${text}`);
            }}
          />
          <TextInput
            style={styles.description}
            placeholder={
              column2.description?.slice(0, 55) ||
              `${column2.name} description`.slice(0, 55)
            }
            onChangeText={(text) => {
              console.log(`description: ${text}`);
            }}
          />
        </View>
      </View>
      <View style={styles.column3}>
        <ActionsModal
          deleteObj={column3.deleteObj}
          modalVisible={modalVisible}
          obj={column3.obj}
          setModalVisible={setModalVisible}
        />
        <EditModal
          modalVisible={modalVisible}
          obj={column3.obj}
          setModalVisible={setModalVisible}
          updateObj={column3.updateObj}
          columns={{
            column1,
            column2,
            column3,
          }}
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
              <Icon type={column3.iconType} size={16} />
            ) : (
              <></>
            )
          }
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  column1: {
    width: 64,
  },
  column2: {
    flex: 2,
    justifyContent: "space-between",
  },
  column3: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: 40,
  },
  description: {
    fontSize: 16,
  },
  row: {
    borderRadius: 6,
    elevation: 2,
    flexDirection: "row",
    height: 160,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: COLORS.light.tabIconDefault,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
  },
  text: {
    flex: 1,
  },
  name: {
    fontSize: 24,
  },
});
