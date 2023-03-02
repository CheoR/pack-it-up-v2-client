import { Box, Item, Move } from "../types/types";

export function isBox(obj: Box | Item | Move): obj is Box {
  return (obj as Box).move_id !== undefined;
}

export function isHome(obj: Box | Item | Move): obj is Item {
  console.log(obj);
  console.log(`obj has .box_id === none: ${(obj as Item).box_id === "none"}`);
  return (obj as Item).box_id === "none";
}

export function isItem(obj: Box | Item | Move): obj is Item {
  return (obj as Item).box_id !== undefined;
}
