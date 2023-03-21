import { Box, Item, Move, PossibleTypeObj } from "../types/types";
import {
  defaultUpdateBox,
  defaultUpdateItem,
  defaultUpdateMove,
} from "../constants/Defaults";

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

export function printKeysValues(obj: any, fileName: string = ""): void {
  console.log(`------------ ${fileName} -----------`);
  if (obj.constructor.name === "Object") {
    Object.keys(obj).forEach((key) => {
      console.log(`${key}: ${obj[key]}`);
    });
  } else if (Array.isArray(obj)) {
    obj.forEach((key) => console.log(key));
  } else {
    console.log(obj);
  }

  console.log(`------------ ${fileName} -----------`);
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
