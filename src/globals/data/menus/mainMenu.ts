import MenuItemDef from '@/globals/definitions/MenuItemDef';

export const mainMenu: MenuItemDef[] = [
  {
    id: 'home',
    icon: 'home',
    accessKey: '',
    visible: true,
    route: 'home',
    disabled: false,
  },
  {
    id: 'widgets',
    icon: 'view_quilt',
    visible: true,
    // route: '#',
    disabled: false,
  },
];
