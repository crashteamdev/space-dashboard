import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth();
export const registrationEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Учетная запись успешно создана
    const user = userCredential.user;
    console.log('Учетная запись создана успешно', user);
    return user
  })
  .catch((error) => {
    // Обработка ошибок
    console.error('Ошибка создания учетной записи', error);
    return false
  });
};