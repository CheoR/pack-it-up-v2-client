import {
  defaultUpdateBox,
  defaultUpdateItem,
  defaultUpdateMove,
} from "../constants/Defaults";
import { Box, Item, Move, PossibleTypeObj } from "../types/types";

export function isBox(obj: Box | Item | Move): obj is Box {
  return (obj as Box).move_id !== undefined;
}

export function isHome(obj: Box | Item | Move): obj is Item {
  return (obj as Item).box_id === "none";
}

export function isItem(obj: Box | Item | Move): obj is Item {
  return (obj as Item).box_id !== undefined;
}

export function isMove(obj: Box | Item | Move): obj is Move {
  return (obj as Move).boxItemsCount !== undefined;
}

export function removeInvalidFieldsForObjType(
  obj: Omit<PossibleTypeObj, "Home">
) {
  let filtered;

  if (isItem(obj)) {
    filtered = Object.keys(obj)
      .filter((key) => defaultUpdateItem.includes(key))
      .reduce((acc, key) => {
        return {
          ...acc,
          [key]: obj[key as keyof typeof obj],
        };
      }, {});
  } else if (isBox(obj)) {
    filtered = Object.keys(obj)
      .filter((key) => defaultUpdateBox.includes(key))
      .reduce((acc, key) => {
        return {
          ...acc,
          [key]: obj[key as keyof typeof obj],
        };
      }, {});
  } else {
    filtered = Object.keys(obj)
      .filter((key) => defaultUpdateMove.includes(key))
      .reduce((acc, key) => {
        return {
          ...acc,
          [key]: obj[key as keyof typeof obj],
        };
      }, {});
  }

  return {
    ...filtered,
  };
}
