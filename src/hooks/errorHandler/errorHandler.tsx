export const errorHandler = (status: number, title: any) => {
  switch (status) {
    case 200:
      return title.success;
    case 400:
      return "Ошибка 400 - переданы ошибочные данные";
    case 401:
      return "Ошибка 401 - неверные учетные данные";
    case 403:
      return "Ошибка 403 - доступ запрещён";
    case 422:
      return `Ошибка 422 - ${title.four}`;
    case 500:
      return "Ошибка 500 - сервер не отвечает";
  }
};
