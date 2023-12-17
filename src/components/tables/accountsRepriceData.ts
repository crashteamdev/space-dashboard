export interface AccountsType {
  id?: string;
  name?: string;
  email?: string;
  login?: string;
  lastUpdate?: string;
  monitorState?: "suspended" | "active";
  updateState?: "not_started" | "in_progress" | "finished" | "error";
  initializeState?: "not_started" | "in_progress" | "finished" | "error";
}

export interface EnTableType {
  id: string;
  imgsrc: string;
  name: string;
  email: string;
  pname: string;
  teams: {
    id: string;
    color: string;
    text: string;
  }[];
  status: string;
  weeks: string;
  budget: string;
}

const basicsTableData: AccountsType[] = [
  {
    id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    name: "string",
    email: "qwdwe@mail.ru",
    login: "string",
    lastUpdate: "2019-08-24T14:15:22Z",
    monitorState: "suspended",
    updateState: "not_started",
    initializeState: "not_started"
  },
  {
    id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    name: "string",
    email: "qwdwe@mail.ru",
    login: "string",
    lastUpdate: "2019-08-24T14:15:22Z",
    monitorState: "suspended",
    updateState: "not_started",
    initializeState: "not_started"
  },
  {
    id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    name: "string",
    email: "qwdwe@mail.ru",
    login: "string",
    lastUpdate: "2019-08-24T14:15:22Z",
    monitorState: "suspended",
    updateState: "not_started",
    initializeState: "not_started"
  },
  {
    id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    name: "string",
    email: "qwdwe@mail.ru",
    login: "string",
    lastUpdate: "2019-08-24T14:15:22Z",
    monitorState: "suspended",
    updateState: "not_started",
    initializeState: "not_started"
  },
  {
    id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    name: "string",
    email: "qwdwe@mail.ru",
    login: "string",
    lastUpdate: "2019-08-24T14:15:22Z",
    monitorState: "suspended",
    updateState: "not_started",
    initializeState: "not_started"
  }
];

export { basicsTableData };
