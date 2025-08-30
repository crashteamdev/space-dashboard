export const data = ["yookassa", "ClickUp", "Оплата с баланса"];

export const pricing = [
  {
    id: 1,
    package: "Default",
    packageRu: "Базовый",
    monthlyplan: 1990,
    discount: 10,
    diccountMath: .10,
    avatar: "/images/backgrounds/silver.png",
    badge: false,
    btntext: "Выбрать",
    rules: [
      {
        limit: true,
        title: "Доступ к расширению"
      },
      {
        limit: true,
        title: "История позиций товара"
      },
      {
        limit: true,
        title: "30 дней периода аналитики"
      },
      {
        limit: true,
        title: "Отчеты по магазинам в формате Excel"
      },
      {
        limit: true,
        title: "Общая аналитика по магазинам"
      },
      {
        limit: true,
        title: "Все магазины продавцов"
      },
      {
        limit: true,
        title: "Общая аналитика по категорииям"
      },
      {
        limit: false,
        title: "Отчеты по категориям в формате Excel"
      },
      {
        limit: false,
        title: "Приоритетная поддержка"
      }
    ]
  },
  {
    id: 2,
    package: "Advanced",
    packageRu: "Расширенный",
    monthlyplan: 2590,
    discount: 15,
    diccountMath: .15,
    avatar: "/images/backgrounds/bronze.png",
    badge: true,
    btntext: "Выбрать",
    rules: [
      {
        limit: true,
        title: "Доступ к расширению"
      },
      {
        limit: true,
        title: "История позиций товара"
      },
      {
        limit: true,
        title: "30 / 60 / 90 дней периода аналитики"
      },
      {
        limit: true,
        title: "Отчеты по магазинам в формате Excel"
      },
      {
        limit: true,
        title: "Отчеты по категориям в формате Excel"
      },
      {
        limit: true,
        title: "Общая аналитика по магазинам"
      },
      {
        limit: true,
        title: "Все магазины продавцов"
      },
      {
        limit: true,
        title: "Общая аналитика по категорииям"
      },
      {
        limit: true,
        title: "Приоритетная поддержка"
      }
    ]
  },
  {
    id: 3,
    package: "Pro",
    packageRu: "Профессиональный",
    monthlyplan: 3290,
    discount: 20,
    diccountMath: .20,
    avatar: "/images/backgrounds/gold.png",
    badge: false,
    btntext: "Выбрать",
    rules: [
      {
        limit: true,
        title: "Доступ к расширению"
      },
      {
        limit: true,
        title: "История позиций товара"
      },
      {
        limit: true,
        title: "30 / 60 / 90 / 120 дней периода аналитики"
      },
      {
        limit: true,
        title: "Отчеты по магазинам в формате Excel"
      },
      {
        limit: true,
        title: "Отчеты по категориям в формате Excel"
      },
      {
        limit: true,
        title: "Общая аналитика по магазинам"
      },
      {
        limit: true,
        title: "Все магазины продавцов"
      },
      {
        limit: true,
        title: "Общая аналитика по категорииям"
      },
      {
        limit: true,
        title: "Приоритетная поддержка"
      }
    ]
  }
];
