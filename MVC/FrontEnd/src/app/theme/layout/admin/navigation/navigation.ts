import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navegar',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'entrenadores',
        title: 'Entrenadores',
        type: 'item',
        url: '/entrenadores',
        icon: 'feather icon-home',
        classes: 'nav-item'
      },
      {
        id: 'miembros',
        title: 'Miembros',
        type: 'item',
        url: '/miembros',
        icon: 'feather icon-home',
        classes: 'nav-item'
      },
      {
        id: 'sesiones',
        title: 'Sesiones de Entrenamiento',
        type: 'item',
        url: '/sesiones',
        icon: 'feather icon-home',
        classes: 'nav-item'
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
