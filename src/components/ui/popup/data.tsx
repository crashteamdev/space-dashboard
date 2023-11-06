export const data = ["Прямая оплата", "Оплата с баланса"];

export const pricing = [
  {
    id: 1,
    package: "Default",
    monthlyplan: 15,
    avatar: "/images/backgrounds/silver.png",
    badge: false,
    btntext: "Выбрать",
    rules: [
      {
        limit: true,
        title: "Доступ к расширению",
      },
      {
        limit: true,
        title: "Позиции товара",
      },
      {
        limit: true,
        title: "30 дней периода аналитики",
      },
      {
        limit: true,
        title: "3 отчета по магазинам в сутки",
      },
      {
        limit: false,
        title: "2 отчета Excel по категориям в сутки",
      },
      {
        limit: false,
        title: "Приоритетная поддержка",
      },
    ],
  },
  {
    id: 2,
    package: "Advanced",
    monthlyplan: 30,
    avatar: "/images/backgrounds/bronze.png",
    badge: false,
    btntext: "Выбрать",
    rules: [
      {
        limit: true,
        title: "Доступ к расширению",
      },
      {
        limit: true,
        title: "Позиции товара",
      },
      {
        limit: true,
        title: "30 / 60 дней периода аналитики",
      },
      {
        limit: true,
        title: "6 отчетов Excel по магазинам в сутки",
      },
      {
        limit: true,
        title: "2 отчета Excel по категориям в сутки",
      },
      {
        limit: true,
        title: "Приоритетная поддержка",
      },
    ],
  },
  {
    id: 3,
    package: "Pro",
    monthlyplan: 40,
    avatar: "/images/backgrounds/gold.png",
    badge: false,
    btntext: "Выбрать",
    rules: [
      {
        limit: true,
        title: "Доступ к расширению",
      },
      {
        limit: true,
        title: "Позиции товара",
      },
      {
        limit: true,
        title: "30 / 60 / 90 / 120 дней периода аналитики",
      },
      {
        limit: true,
        title: "15 отчетов Excel по магазинам в сутки",
      },
      {
        limit: true,
        title: "4 отчета Excel по категориям в сутки",
      },
      {
        limit: true,
        title: "Приоритетная поддержка",
      },
    ],
  },
];