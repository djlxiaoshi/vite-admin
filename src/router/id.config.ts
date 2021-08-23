import { HomeFilled } from "@ant-design/icons";
import HomePage from "@/pages/Home/index";
import AboutPage from "@/pages/About/index";

export const Config: RouteItem[] = [
  {
    path: "/",
    title: "home",
    component: HomePage,
    noMenu: true,
    permission: true,
  },
  {
    path: "/home",
    title: "home",
    icon: HomeFilled,
    component: HomePage,
    permission: true,
  },
  {
    path: "/about",
    title: "about",
    component: AboutPage,
    permission: true,
  },
  {
    path: "/menu",
    title: "Menu-1",
    component: HomePage,
    permission: true,
    subMenu: [
      {
        path: "/menu/1",
        title: "Menu-1-1",
        component: HomePage,
        permission: true,
        subMenu: [
          {
            path: "/menu/1/1",
            title: "Menu-1-1-1",
            component: AboutPage,
            permission: true,
          },
          {
            path: "/menu/1/2",
            title: "Menu-1-1-2",
            component: AboutPage,
            // noMenu: true,
          },
        ],
      },
      {
        path: "/menu/2",
        title: "Menu-2",
        component: AboutPage,
        permission: true,
        // noMenu: true,
      },
    ],
  },
];

export default Config;
