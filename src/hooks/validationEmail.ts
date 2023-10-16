
const emailRegExp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const errorText: string = "Email невалиден"

export const validationEmail = (value: string) => {
  const isValidEmail = emailRegExp.test(value);

  if (isValidEmail) {
    return {value, error: ""}
  } else {
    return {value, error: errorText}
  }
};