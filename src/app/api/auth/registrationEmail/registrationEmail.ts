import { createUserWithEmailAndPassword } from "firebase/auth";

export const registrationEmail = (auth: any, email: string, password: string) => {
  console.log(email, password);
  
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
};