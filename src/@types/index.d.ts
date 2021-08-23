import { ReactElement, ReactComponentElement } from "react";

declare global {
  interface RouteItem {
    path: string;
    title: string;
    icon?: any;
    component?: ReactComponentElement;
    noMenu?: boolean;
    subMenu?: RouteItem[];
    permission?: boolean;
  }
}
