interface Base {
  _id: string;
  description? : string;
  name: string;
}

export interface Box extends Base {
  move_id: string;
}

export interface Item extends Base {
  box_id: string;
  isFragile: boolean;
  value: number;
}

export interface Move extends Base {

}

export interface ItemInput {
  input: {
    count?: number;
  } & Item
}

export interface BoxInput {
  input: {

  } & Box
}

export interface MoveInput {
  input: {

  } & Move
}


export interface Badges {
  badge1: Badge;
  badge2?: Badge;
}

export interface Counter {
  mutation: ({}) => Promise<any>;
  type: PossibleTypeName;
  rest: PossibleTypeCreate;
}

export interface Icons {
  type: PossibleIcons;
  size: PossibleIconSizes;
}

export interface ColumnOne {
  badge1: Badge;
  badge2?: Badge;
}

export interface ColumnTwo extends Item {
  canEdit?: boolean;
  defaultDropdownValue?: string;
  deleteObj: () => void;
  disableDropdown?: boolean;
  dropdown?: object[];
  showDropdown?: boolean;
  showValues?: boolean;
  type: string;
  updateObj: ({}) => void;
}

export interface ColumnThree {
  columns: object;
  disableDropdown?: boolean;
  deleteObj: () => void;
  dropdown?: object[]; // TODO: Create type with Pick to only include { _id: , name } 
  iconType?: NavIcons;
  obj?: PossibleTypeObj;
  showIcon?: boolean;
  updateObj: ({}) => void;
}

export interface Row {
  column1: Badges
  column2: ColumnTwo
  column3: ColumnThree
}
export interface ScrollAndCounter {
  children: JSX.Element[];
  mutation: () => Promise<any>;
  rest: PossibleTypeCreate;
  screen: PossibleScreens;
  type: PossibleTypeName;
}

export type Badge = {
  count?: number;
  type: PossibleIcons;
  size?: PossibleIconSizes;
  showType?: boolean;
};

export type CreateItem = Omit<ItemInput["input"], "_id">
export type CreateBox = Omit<BoxInput["input"], "_id">
export type CreateMove = Omit<MoveInput["input"], "_id">

export type Dictionary = {
  [key in PossibleIcons]: string;
};

export type NavIcons = "chevron" | "dots";
export type PossibleIcons =
  | "box"
  | "camera"
  | "chevron"
  | "closedPackage"
  | "delete"
  | "dots"
  | "edit"
  | "item"
  | "move"
  | "none"
  | "plusSign";
export type PossibleIconSizes = Sixteen | TwentyFour | TwoOhEight;
export type PossibleTypeCreate = Partial<CreateItem & CreateBox & CreateMove>
export type PossibleTypeObj = Item | Box | Move
export type PossibleTypeName = "item" | "box" | "move"
export type PossibleScreens = "Items" | "Boxes" | "Moves" | "Home"

export type TwentyFour = 24;
export type TwoOhEight = 208;
export type Sixteen = 16;
