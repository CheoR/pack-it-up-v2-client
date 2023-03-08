interface Base {
  _id: string;
  __typename?: string;
  count?: number;
  description?: string;
  isFragile?: boolean;
  name: string;
  value?: number;
}

export interface Box extends Base {
  move_id: string;
}

export interface Item extends Base {
  box_id: string;
}

export interface Home extends Base {}

export interface Move extends Base {
  boxItemsCount?: number;
}

export interface ItemInput {
  input: {
    count?: number;
  } & Item;
}

export interface BoxInput {
  input: {
    count?: number;
  } & Box;
}

export interface MoveInput {
  input: {
    count?: number;
  } & Move;
}

export interface ActionsModal {
  modalVisible: {
    actionsModal: boolean;
    editModal: boolean;
  };
  obj: PossibleTypeObj;
  setModalVisible: React.Dispatch<
    React.SetStateAction<{
      actionsModal: boolean;
      editModal: boolean;
    }>
  >;
}

export interface Badges {
  badge1: Badge;
  badge2?: Badge;
}

export interface ViewIconOption {
  showIcon: boolean;
  showCount: boolean;
  showType: boolean;
}

export type ColumnOne = PossibleTypeObj & ViewIconOption;

export type ColumnTwo<T> = T & isEditabe;
export type ColumnThree<T> = T & {
  iconType?: NavIcons;
  showIcon?: boolean;
};

export interface ConfirmCancel {
  children: JSX.Element[] | JSX.Element;
  parentModalVisible: {
    actionsModal: boolean;
    editModal: boolean;
    showConfirmCancel: boolean;
  };
  parentSetModalVisiible: React.Dispatch<
    React.SetStateAction<{
      actionsModal: boolean;
      editModal: boolean;
      showConfirmCancel: boolean;
    }>
  >;
}

export interface Counter {
  mutation: ({}) => Promise<any>;
  type: PossibleTypeName;
  rest: PossibleTypeCreate;
}

export interface EditableFields {
  box: {} & isEditabe;

  default: {} & isEditabe;

  home: {} & isEditabe;

  item: {} & isEditabe;

  move: {} & isEditabe;
}
export interface Icons {
  type: PossibleIcons;
  size: PossibleIconSizes;
}

export interface isEditabe {
  canEdit: boolean;
  disableDropdown: boolean;
  showDropdown: boolean;
  showValues: boolean;
}

export interface EditModal {
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
  // updateObj?: () => void;
}

export interface ModalOption {
  iconSize: PossibleIconSizes;
  iconType: PossibleIcons;
  obj: PossibleTypeObj;
  parentModalVisible: {
    actionsModal: boolean;
    editModal: boolean;
    showConfirmCancel: boolean;
  };
  parentSetModalVisiible: React.Dispatch<
    React.SetStateAction<{
      actionsModal: boolean;
      editModal: boolean;
      showConfirmCancel: boolean;
    }>
  >;
  text: string;
}

export interface Row {
  column1: ColumnOne;
  column2: ColumnTwo<unknown>;
  column3: ColumnThree<unknown>;
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

export type CreateItem = Omit<ItemInput["input"], "_id">;
export type CreateBox = Omit<BoxInput["input"], "_id">;
export type CreateMove = Omit<MoveInput["input"], "_id">;

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
export type PossibleTypeCreate = Partial<CreateItem & CreateBox & CreateMove>;
export type PossibleTypeObj = Item | Box | Move | Home;
export type PossibleTypeName = "item" | "box" | "move";
export type PossibleScreens = "Items" | "Boxes" | "Moves" | "Home";

export type TwentyFour = 24;
export type TwoOhEight = 208;
export type Sixteen = 16;
