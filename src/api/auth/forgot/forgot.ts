import { LogAction } from "@/features/logAction";
import { auth } from "@/shared/firebase/firebase";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";

export const forgotPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
    await LogAction(`Пользователь запросил сброс пароля.\nEmail: ${email}`);
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/user-not-found":
          throw new Error("Пользователь с таким email не найден.");
        case "auth/invalid-email":
          throw new Error("Неверный формат email.");
        case "auth/too-many-requests":
          throw new Error("Слишком много попыток. Попробуйте позже.");
        default:
          throw new Error(`Ошибка Firebase: ${error.message}`);
      }
    } else {
      throw new Error(`Неизвестная ошибка: ${String(error)}`);
    }
  }
};
