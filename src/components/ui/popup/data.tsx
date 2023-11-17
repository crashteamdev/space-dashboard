export const data = ["freekassa", "uz-click", "Оплата с баланса"];

const checkTarif = (value: string) => {
  switch (value) {
    case "validPromoCode":
      return "Промокод применен"
    case "invalidPromoCodeDate":
      return "У промокода истек срок использования"
    case "invalidPromoCodeUseLimit":
      return "Превышен лимит использования промокода"
    case "notFoundPromoCode":
      return "Промокод не найден"
    default: 
      return "Промокод не найден"
  }
}

export const pricing = [
  {
    id: 1,
    package: "Default",
    packageRu: "Базовый",
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
    packageRu: "Расширенный",
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
    packageRu: "Профессиональный",
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