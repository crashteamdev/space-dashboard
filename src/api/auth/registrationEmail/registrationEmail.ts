import { auth } from "@/shared/firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile, User } from "firebase/auth";
import { FirebaseError } from "firebase/app";
// import { LogAction } from "@/features/logAction";

export const registrationEmail = async (email: string, password: string, displayName: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if(displayName) {
      await updateProfile(user, { displayName });
    }

    // if(user) {
    //   await LogAction(`Зарегистрировался новый юзер по логину и паролю!\nEmail: ${user.email}\nИмя: ${user.displayName ? user.displayName : "Отсутствует"}`);
    // }

    return user;
  }catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          throw new Error("Пользователь с таким email уже существует.");
        case "auth/invalid-email":
          throw new Error("Неверный формат email.");
        case "auth/weak-password":
          throw new Error("Слишком слабый пароль.");
        default:
          throw new Error(`Ошибка Firebase: ${error.message}`);
      }
    } else {
      throw new Error(`Неизвестная ошибка: ${String(error)}`);
    }
  }
};