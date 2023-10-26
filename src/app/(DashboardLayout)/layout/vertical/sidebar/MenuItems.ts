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
  [companyName: string]: MenuitemsType[]
}

import {
  IconAward,
  IconBoxMultiple,
  IconPoint,
  IconAlertCircle,
  IconNotes,
  IconCalendar,
  IconMail,
  IconTicket,
  IconEdit,
  IconGitMerge,
  IconCurrencyDollar,
  IconApps,
  IconFileDescription,
  IconFileDots,
  IconFiles,
  IconBan,
  IconStar,
  IconMoodSmile,
  IconBorderAll,
  IconBorderHorizontal,
  IconBorderInner,
  IconBorderVertical,
  IconBorderTop,
  IconUserCircle,
  IconPackage,
  IconMessage2,
  IconBasket,
  IconChartLine,
  IconChartArcs,
  IconChartCandle,
  IconChartArea,
  IconChartDots,
  IconChartDonut3,
  IconChartRadar,
  IconLogin,
  IconUserPlus,
  IconRotate,
  IconBox,
  IconShoppingCart,
  IconAperture,
  IconLayout,
  IconSettings,
  IconHelp,
  IconZoomCode,
  IconBoxAlignBottom,
  IconBoxAlignLeft,
  IconBorderStyle2,
  IconAppWindow,
} from "@tabler/icons-react";

const MenuitemsKazan: MenuitemsT = {
  'ke': [
    {
      navlabel: true,
      subheader: " ",
    },
    {
      id: uniqueId(),
      title: "Личный профиль",
      icon: IconStar,
      href: "/apps/user-profile/profile",
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
          href: "/apps/extension",
        },
        {
          id: uniqueId(),
          title: "Тарифы",
          icon: IconPoint,
          href: "/theme-pages/pricing",
        },
      ],
    },
  ],
  "uzum": [
    {
      navlabel: true,
      subheader: " ",
    },
    {
      id: uniqueId(),
      title: "Личный профиль",
      icon: IconStar,
      href: "/apps/user-profile/profile",
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
          href: "/apps/extension",
        },
      ],
    },
    {
      id: uniqueId(),
      title: "Тарифы",
      icon: IconTicket,
      href: "/theme-pages/pricing",
    },
  ]
};

export default MenuitemsKazan;
