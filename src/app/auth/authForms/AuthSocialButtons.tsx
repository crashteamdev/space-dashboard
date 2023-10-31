import CustomSocialButton from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomSocialButton";
import { Stack } from "@mui/system";
import { Avatar, Box } from "@mui/material";
import { signInType } from "@/app/(DashboardLayout)/types/auth/auth";
import { signInGoogle } from "@/app/api/auth/google/google";
import { useRouter } from "next/navigation";
import { useDispatch } from "@/store/hooks";
import { getAuth } from "firebase/auth";
import firebase_app from "@/firebase/firebase";
import { IUser } from "@/app/(DashboardLayout)/types/apps/user";
import { setUser } from "@/store/user/userSlice";

const AuthSocialButtons = ({ title }: signInType) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = getAuth(firebase_app);

  const signIn = async () => {
    const user = await signInGoogle();

    if (user?.email) {
      router.push("/");
    }
    localStorage.setItem('remember', 'on')
    if (auth.currentUser) {
      const { uid, accessToken, displayName, email, photoURL } =
        auth.currentUser as any;
      const user = {
        uid,
        accessToken,
        displayName,
        email,
        photoURL,
      } as IUser;

      dispatch(setUser(user));
    }
  };

  return (
    <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
      <CustomSocialButton
        onClick={() => signIn()}
        style={{ maxWidth: "340px", width: "100%" }}
      >
        <Avatar
          src={"/images/svgs/google-icon.svg"}
          alt={"icon1"}
          sx={{
            width: 16,
            height: 16,
            borderRadius: 0,
            mr: 1,
          }}
        />
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            whiteSpace: "nowrap",
            mr: { sm: "3px" },
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
