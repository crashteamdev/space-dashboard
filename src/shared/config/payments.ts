import { v4 as uuidv4 } from "uuid";

export const PAYMENTS_ENABLED = process.env.NEXT_PUBLIC_PAYMENTS_ENABLED !== "false";

export const PAYMENTS_UNAVAILABLE_MESSAGE = "Платежи временно недоступны. Попробуйте позже.";

export const createPaymentsUnavailableAlert = () => ({
  title: PAYMENTS_UNAVAILABLE_MESSAGE,
  status: "error" as const,
  timelife: 4000,
  id: uuidv4()
});
