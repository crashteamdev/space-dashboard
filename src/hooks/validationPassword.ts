
const passwordRegExp: RegExp = /^(?=.*[a-z]).{6,}$/;
const errorText: string = "Password невалиден";

export const validationPassword = (value: string) => {
  const isValidEmail = passwordRegExp.test(value);
  
  if (isValidEmail) {
    return {value, error: ""};
  } else {
    return {value, error: errorText};
  }
};