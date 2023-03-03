import { Box, Item, Move } from "../types/types";

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
