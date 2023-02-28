interface Base {
  _id: string;
  __typename?: string;
  description? : string;
  name: string;
}

export interface Box extends Base {
  move_id: string;
}

export interface Boxes extends Box {
  count?: number
  isFragile?: boolean;
  value?: number;
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
    count?: number;
  } & Box
}

export interface MoveInput {
  input: {
    count?: number;
  } & Move
}


export interface ActionsModal {
  deleteObj: () => void;
  modalVisible: {
    actionsModal: boolean;
    editModal: boolean;
  };
  obj: PossibleTypeObj;
  setModalVisible: React.Dispatch<
    React.SetStateAction<{
      actionsModal: boolean;
      editModal: boolean;
    }>>
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

export interface EditableFields {
  item: {

  } & isEditabe
  box: {

  } & isEditabe
  
  default: {

  } & isEditabe
  
  move: {
  }  & isEditabe
}
export interface Icons {
  type: PossibleIcons;
  size: PossibleIconSizes;
}


export interface isEditabe {
  showDropdown: boolean
  disableDropdown: boolean
  showValues: boolean
}

export interface ColumnOne {
  badge1: Badge;
  badge2?: Badge;
}

export interface ColumnTwo extends Item {
  canEdit?: boolean;
  dropdown?: object[];
  obj: PossibleTypeObj;
  value: number;
}

export interface ColumnThree {
  columns?: object;
  deleteObj?: () => void;
  iconType?: NavIcons;
  obj?: PossibleTypeObj;
  showIcon?: boolean;
  updateObj?: () => void;
}


export interface EditModal {
  columns?: {
    column1: ColumnOne,
    column2: ColumnTwo,
  };
  modalVisible: {
    actionsModal: boolean;
    editModal: boolean;
  };
  obj?: PossibleTypeObj;
  setModalVisible: React.Dispatch<
    React.SetStateAction<{
      actionsModal: boolean;
      editModal: boolean;
    }>
  >;
  updateObj?: () => void;
}


export interface Option {
  iconSize?: PossibleIconSizes;
  iconType?: PossibleIcons;
  optionalFunc?: ({}) => void;
  optionalFuncExtras?: Object;
  setState: ({}) => void;
  setStateExtras: Object;
  text: string;
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
  size?: PossibleIconSizes;
  showCount?: boolean;
  showType?: boolean;
  type: PossibleIcons;
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
