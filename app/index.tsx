import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-8 bg-background px-6">
      <Text className="h1 text-center text-lingua-purple">Lingua</Text>
      <Link href="/onboarding" asChild>
        <Pressable className="items-center rounded-2xl bg-lingua-purple px-8 py-4">
          <Text className="font-poppins-semibold text-base text-white">
            View onboarding
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
