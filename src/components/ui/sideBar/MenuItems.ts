import { uniqueId } from "lodash";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

interface MenuitemsT {
  [companyName: string]: MenuitemsType[];
}

import {
  IconPoint,
  IconTicket,
  IconStar,
  IconChartDonut3,
  // IconFileDots
} from "@tabler/icons-react";

const MenuitemsKazan: MenuitemsT = {
  ke: [
    {
      navlabel: true,
      subheader: " "
    },
    {
      id: uniqueId(),
      title: "Личный профиль",
      icon: IconStar,
      href: "/profile"
    },
    {
      id: uniqueId(),
      title: "Аналитика",
      icon: IconChartDonut3,
      href: "/apps/blog/",
      children: [
        {
          id: uniqueId(),
          title: "Расширение",
          icon: IconPoint,
          href: "/extension",
        },
        {
          id: uniqueId(),
          title: "Тарифы",
          icon: IconTicket,
          href: "/pricing",
        },
      ],
    },
    // {
    //   id: uniqueId(),
    //   title: "Управление ценами",
    //   icon: IconFileDots,
    //   href: "/reprice"
    // }
  ],
  uzum: [
    {
      navlabel: true,
      subheader: " "
    },
    {
      id: uniqueId(),
      title: "Личный профиль",
      icon: IconStar,
      href: "/profile"
    },
    {
      id: uniqueId(),
      title: "Аналитика",
      icon: IconChartDonut3,
      href: "/",
      children: [
        {
          id: uniqueId(),
          title: "Расширение",
          icon: IconPoint,
          href: "/extension",
        },
        {
          id: uniqueId(),
          title: "Тарифы",
          icon: IconTicket,
          href: "/pricing",
        },
      ],
    },
    // {
    //   id: uniqueId(),
    //   title: "Управление ценами",
    //   icon: IconFileDots,
    //   href: "/reprice"
    // }
  ]
};

export default MenuitemsKazan;
