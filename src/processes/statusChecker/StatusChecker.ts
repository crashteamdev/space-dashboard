
const statusChecker = (status: any) => {
  switch(status) {
    case "pending":
      return "в ожидании";
    case "success":
      return "успешный";
    case "canceled":
      return "отменен";
    case "failed":
      return "неуспешный";
  }
};

export default statusChecker;