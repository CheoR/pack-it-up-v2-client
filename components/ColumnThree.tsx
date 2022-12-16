import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

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

export default function ColumnThree({
  listView = "home",
  iconType = "dots",
  showIcon = true,
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.column}>
      <Pressable
        onPress={() => {
          navigation.navigate(formatRoute[listView]);
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
  column: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: 40,
  },
});
