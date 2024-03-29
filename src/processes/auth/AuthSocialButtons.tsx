import React from "react";
import CustomSocialButton from "@/components/ui/theme-elements/CustomSocialButton";
import { Stack } from "@mui/system";
import { Avatar, Box } from "@mui/material";
import { signInType } from "@/shared/types/auth/auth";
import { signInGoogle } from "@/api/auth/google/google";
import { useRouter } from "next/navigation";
import { useDispatch } from "@/shared/store/hooks";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { IUser } from "@/shared/types/apps/user";
import { setUser } from "@/shared/store/slices/user/userSlice";
import { addItem } from "@/shared/store/slices/alerts/AlertsSlice";
import { v4 as uuidv4 } from "uuid";

const AuthSocialButtons = ({ title }: signInType) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = getAuth(firebase_app);

  const signIn = async () => {
    const user = await signInGoogle();

    if (user?.email) {
      router.push("/profile");
      dispatch(
        addItem({
          title: "Вы успешно вошли в аккаунт",
          status: "success",
          timelife: 4000,
          id: uuidv4()
        })
      );
    }

    localStorage.setItem("remember", "on");

    if (auth.currentUser) {
      const { uid, accessToken, displayName, email, photoURL } = auth.currentUser as any;
      const user = {
        uid,
        accessToken,
        displayName,
        email,
        photoURL
      } as IUser;

      dispatch(setUser(user));
    }

  };

  return (
    <Stack direction='row' justifyContent='center' spacing={2} mt={3}>
      <CustomSocialButton onClick={() => signIn()} style={{ maxWidth: "340px", width: "100%" }}>
        <Avatar
          src={"/images/svgs/google-icon.svg"}
          alt={"icon1"}
          sx={{
            width: 16,
            height: 16,
            borderRadius: 0,
            mr: 1
          }}
        />
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            whiteSpace: "nowrap",
            mr: { sm: "3px" }
          }}
        >
          {title}{" "}
        </Box>{" "}
        Google
      </CustomSocialButton>
    </Stack>
  );
};

export default AuthSocialButtons;
