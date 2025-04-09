import { Redirect, Slot } from "expo-router";
import { useClerk, useUser } from "@clerk/clerk-expo";

const AuthLayout = () => {
  const { user } = useUser();

  if (user) return <Redirect href="/(root)" />;
  return <Slot />;
};
export default AuthLayout;
  