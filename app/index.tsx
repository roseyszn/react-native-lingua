import { useAuth, useClerk } from "@clerk/expo";
import { Redirect, useRouter } from "expo-router";
import { Alert, Pressable, Text, View } from "react-native";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const router = useRouter();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      Alert.alert(
        "Unable to sign out",
        error instanceof Error ? error.message : "Please try again.",
      );
    }
  }

  return (
    <View className="flex-1 items-center justify-center gap-6 bg-background px-6">
      <Text className="h1 text-center text-lingua-purple">Lingua</Text>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/language-selection")}
        className="items-center rounded-2xl bg-lingua-blue px-8 py-4"
      >
        <Text className="font-poppins-semibold text-base text-white">
          Choose language
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        onPress={() => void handleSignOut()}
        className="items-center rounded-2xl bg-lingua-purple px-8 py-4"
      >
        <Text className="font-poppins-semibold text-base text-white">
          Sign out
        </Text>
      </Pressable>
    </View>
  );
}
