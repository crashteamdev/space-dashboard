
const emailRegExp: RegExp = /^[\w.%+-]+@[a-z\d.-]+\.[a-z]{2,}$/i;
const errorText: string = "Email невалиден";

export const validationEmail = (value: string) => {
  const isValidEmail = emailRegExp.test(value);

  if (isValidEmail) {
    return {value, error: ""};
  } else {
    return {value, error: errorText};
  }
};