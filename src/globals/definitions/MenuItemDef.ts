export default interface MenuItemDef {
  id: string;
  icon?: string;
  label?: string;
  accessKey?: string;
  visible?: boolean;
  disabled?: boolean;
  route?: string;
  subItems?: MenuItemDef[];
}
