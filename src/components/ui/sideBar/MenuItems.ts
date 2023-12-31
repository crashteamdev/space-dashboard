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
import BarChartIcon from "@mui/icons-material/BarChart";
import BallotIcon from "@mui/icons-material/Ballot";

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
      icon: BarChartIcon,
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
    {
      id: uniqueId(),
      title: "Управление ценами",
      icon: BallotIcon,
      href: "/reprice"
    }
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
      icon: BarChartIcon,
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
    {
      id: uniqueId(),
      title: "Управление ценами",
      icon: BallotIcon,
      href: "/reprice"
    }
  ]
};

export default MenuitemsKazan;
