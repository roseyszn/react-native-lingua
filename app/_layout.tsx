import "../global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { colors, fontAssets, fontFamilies } from "@/theme";

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);

  if (fontError) {
    throw fontError;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.brand.purple,
        headerTitleStyle: {
          color: colors.neutral.textPrimary,
          fontFamily: fontFamilies.semibold,
        },
      }}
    />
  );
}
