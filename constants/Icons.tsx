import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "./Colors";

export type PossibleIcons =
  | "box"
  | "chevron"
  | "dots"
  | "item"
  | "move"
  | "none";

export type NavIcons = "chevron" | "dots";

//TODO: simplify to all return JSX.Element
interface Dictionary {
  box: JSX.Element;
  chevron: JSX.Element;
  dots: JSX.Element;
  item: JSX.Element;
  move: JSX.Element;
  none: JSX.Element;
}

export const IconDictionary: Dictionary = {
  box: (
    <MaterialCommunityIcons
      name="package-variant-closed"
      size={24}
      color={COLORS.light.tint}
    />
  ),
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
  item: (
    <MaterialCommunityIcons
      name="clipboard-text-outline"
      size={24}
      color={COLORS.light.tint}
    />
  ),
  move: (
    <MaterialCommunityIcons name="dolly" size={24} color={COLORS.light.tint} />
  ),
  none: <></>,
};

export function Icons(type: PossibleIcons): JSX.Element {
  return IconDictionary[type];
}
