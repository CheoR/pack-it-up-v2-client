import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Dictionary, Icons } from "../types/types";
import COLORS from "./Colors";

const IconDictionary: Dictionary = {
  box: "package-variant-closed",
  camera: "camera-outline",
  chevron: "chevron-right",
  closedPackage: "package-variant-closed",
  delete: "delete-outline",
  edit: "square-edit-outline",
  dots: "dots-vertical",
  item: "clipboard-text-outline",
  move: "dolly",
  none: "none",
  plusSign: "plus",
};

export function Icon({
  type,
  size,
}: Icons): typeof MaterialCommunityIcons | React.ReactFragment {
  if (type === "none") return <></>;
  const name = IconDictionary[type];
  const icon = (
    <MaterialCommunityIcons name={name} size={size} color={COLORS.light.tint} />
  );

  return icon;
}
