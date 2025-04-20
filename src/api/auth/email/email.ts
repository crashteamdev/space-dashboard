import { LogAction } from "@/features/logAction";
import { auth } from "@/shared/firebase/firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";

export const signInEmail = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);

    if(user) {
      await LogAction(`Юзер авторизовался!\nEmail: ${user.user.email}\nИмя: ${user.user.displayName ? user.user.displayName : "Отсутствует"}`);
    }

    return user;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/user-not-found":
          throw new Error("Пользователь с таким email не найден.");
        case "auth/wrong-password":
          throw new Error("Неверный пароль.");
        case "auth/invalid-email":
          throw new Error("Неверный формат email.");
        case "auth/too-many-requests":
          throw new Error("Слишком много попыток входа. Попробуйте позже.");
        default:
          throw new Error(`Ошибка Firebase: ${error.message}`);
      }
    } else {
      throw new Error(`Неизвестная ошибка: ${String(error)}`);
    }
  }
};
