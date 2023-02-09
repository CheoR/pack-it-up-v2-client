import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "./Colors";

// type IconResponse = typeof MaterialCommunityIcons | React.ReactFragment;
type TwoOhEight = 208;
type TwentyFour = 24;
type Sixteen = 16;

export type PossibleIconSizes = Sixteen | TwentyFour | TwoOhEight;
export type NavIcons = "chevron" | "dots";
export type PossibleIcons =
  | "box"
  | "chevron"
  | "closedPackage"
  | "dots"
  | "item"
  | "move"
  | "none";

type Dictionary = {
  [key in PossibleIcons]: string;
};

const IconDictionary: Dictionary = {
  box: "package-variant-closed",
  chevron: "chevron-right",
  closedPackage: "package-variant-closed",
  dots: "dots-vertical",
  item: "clipboard-text-outline",
  move: "dolly",
  none: "none",
};

interface Icons {
  type: PossibleIcons;
  size: PossibleIconSizes;
}

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
