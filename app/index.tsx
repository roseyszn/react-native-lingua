import { useAuth, useClerk } from "@clerk/expo";
import { Redirect } from "expo-router";
import { Alert, Pressable, Text, View } from "react-native";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();
  const { signOut } = useClerk();

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
    <View className="flex-1 items-center justify-center gap-8 bg-background px-6">
      <Text className="h1 text-center text-lingua-purple">Lingua</Text>
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
