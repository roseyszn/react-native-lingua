import { Stack } from "expo-router";
import { AuthScreen } from "../components/auth-screen";

export default function SignUp() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <AuthScreen mode="sign-up" />
    </>
  );
}
