import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "@/global.css";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@/cache";
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
  }
  const [loaded, error] = useFonts({
    "Inter-Light": require("@/assets/fonts/Inter_28pt-Light.ttf"),
    "Inter-Regular": require("@/assets/fonts/Inter_28pt-Bold.ttf"),
    "Inter-Medium": require("@/assets/fonts/Inter_28pt-Medium.ttf"),
    "Inter-SemiBold": require("@/assets/fonts/Inter_28pt-SemiBold.ttf"),
    "Inter-Bold": require("@/assets/fonts/Inter_28pt-Bold.ttf"),
    "Inter-ExtraBold": require("@/assets/fonts/Inter_28pt-ExtraBold.ttf"),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={tokenCache}
    >
      <ClerkLoaded>
        <Stack screenOptions={{ headerShown: false }} />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
