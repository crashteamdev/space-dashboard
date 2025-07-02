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
} from "@tabler/icons-react";
import PersonIcon from "@mui/icons-material/Person";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

const MenuitemsKazan: MenuitemsT = {
  ke: [
    {
      navlabel: true,
      subheader: " "
    },
    {
      id: uniqueId(),
      title: "Личный профиль",
      icon: PersonIcon,
      href: "/profile"
    },
    {
      id: uniqueId(),
      title: "Аналитика",
      icon: QueryStatsIcon,
      chip: "Новое",
      chipColor: "secondary",
      href: "/analytics/categories"
    },
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
  uzum: [
    {
      navlabel: true,
      subheader: " "
    },
    {
      id: uniqueId(),
      title: "Личный профиль",
      icon: PersonIcon,
      href: "/profile"
    },
    {
      id: uniqueId(),
      title: "Аналитика",
      icon: QueryStatsIcon,
      href: "/analytics/categories",
      chip: "Новое",
      chipColor: "secondary",
    },
    {
      id: uniqueId(),
      title: "Расширение",
      icon: IconPoint,
      href: "/extension",
    },
  ]
};

export default MenuitemsKazan;
