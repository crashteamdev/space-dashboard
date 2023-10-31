export interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

export interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

export interface signInType {
  title?: string;
}

export type TopUpBalanceType = {
  payment: {
    paymentId: string;
    status: "pending" | "success" | "canceled" | "failed";
    amount: number;
    createdAt: string;
  };
  redirectUrl: string;
};
