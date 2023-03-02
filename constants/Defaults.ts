import { ColumnOne } from "../types/types";

const defaultBoxId = "63d58f28e9c4ff10994a0dca";
const defaultMoveId = "63d2f72669850c57c9184e3c";

export const defaultItemCreate = {
  // TODO: update to add a default box and/or
  // allow for unbounded items
  box_id: defaultBoxId,
  description: "",
  name: "Item",
  value: 0,
  isFragile: false,
};

export const defaultMoveCreate = {
  name: "Move",
  description: "",
};

export const defaultBoxCreate = {
  // TODO: update to add a default box and/or
  // allow for unbounded items
  move_id: defaultMoveId,
  description: "",
  name: "Box",
};

export const defaultItemColumnOne: ColumnOne = {
  badge1: {
    // need as const else get this error
    // Type 'string' is not assignable to type 'PossibleIcons'.
    size: 24 as const,
    showCount: false,
    showType: false,
    type: "item" as const,
  },
};
