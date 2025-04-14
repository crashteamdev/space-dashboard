import React from "react";
import CustomSocialButton from "@/components/ui/theme-elements/CustomSocialButton";
import { Stack } from "@mui/system";
import { Avatar, Box } from "@mui/material";
import { signInGoogle } from "@/api/auth/google/google";
import { useRouter } from "next/navigation";
import { useDispatch } from "@/shared/store/hooks";
import { getAuth } from "firebase/auth";
import firebase_app from "@/shared/firebase/firebase";
import { setUser } from "@/shared/store/slices/user/userSlice";
import { addItem } from "@/shared/store/slices/alerts/AlertsSlice";
import { v4 as uuidv4 } from "uuid";
import { IUser, signInType } from "@/shared/types";

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
    <Stack direction='row' justifyContent='center' mt={2} width={"100%"}>
      <CustomSocialButton onClick={() => signIn()} style={{ width: "100%" }}>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            whiteSpace: "nowrap",
            mr: { sm: "3px" }
          }}
        >
          {title}
        </Box>
        <Avatar
          src={"/images/svgs/google-icon.svg"}
          alt={"icon1"}
          sx={{
            width: 16,
            height: 16,
            borderRadius: 0,
            ml: 1
          }}
        />
      </CustomSocialButton>
    </Stack>
  );
};

export default AuthSocialButtons;
