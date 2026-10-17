import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image, Pressable, Text, View } from "react-native";
import { images } from "../constants/images";

export default function Onboarding() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View className="flex-1 bg-white px-7" style={{ paddingTop: insets.top }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />

      <View className="items-center pt-5">
        <View className="flex-row items-center gap-3">
          <Image
            source={images.mascotLogo}
            resizeMode="contain"
            style={{ width: 48, height: 48 }}
            accessibilityLabel="Lingua fox mascot"
          />
          <Text className="font-poppins-bold text-[30px] leading-10 text-[#0D132B]">
            lingua
          </Text>
        </View>
      </View>

      <View className="mt-12">
        <Text className="font-poppins-semibold text-[31px] leading-[40px] text-[#0D132B]">
          Your AI language{"\n"}
          <Text className="text-lingua-purple">teacher</Text>.
        </Text>
        <Text className="mt-4 font-poppins-regular text-[16px] leading-[27px] text-[#6B7280]">
          Real conversations, personalized{"\n"}
          lessons, anytime, anywhere.
        </Text>
      </View>

      <View className="relative min-h-0 flex-1 items-center justify-center">
        <View className="absolute left-0 top-[18%] z-10 -rotate-[8deg] rounded-[20px] bg-[#EEF6FF] px-5 py-3">
          <Text className="font-poppins-medium text-[19px] text-[#0D132B]">
            Hello!
          </Text>
        </View>
        <View className="absolute right-1 top-[13%] z-10 rotate-[10deg] rounded-[20px] bg-[#F5F3FF] px-5 py-3">
          <Text className="font-poppins-semibold text-[19px] text-[#4E2BF5]">
            ¡Hola!
          </Text>
        </View>
        <View className="absolute right-0 top-[55%] z-10 rotate-[8deg] rounded-[20px] bg-[#FFF3EF] px-5 py-3">
          <Text className="font-poppins-medium text-[19px] text-[#E94D38]">
            你好!
          </Text>
        </View>
        <Image
          source={images.mascotWelcome}
          resizeMode="contain"
          style={{ width: "130%", height: "100%" }}
          accessibilityLabel="Fox mascot waving with a backpack"
        />
      </View>

      <View
        className="pb-6"
        style={{ paddingBottom: Math.max(insets.bottom, 24) }}
      >
        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace("/")}
          className="h-[76px] flex-row items-center justify-center rounded-[24px] bg-lingua-deep-purple"
        >
          <Text className="font-poppins-semibold text-[20px] text-white">
            Get Started
          </Text>
          <Text className="absolute right-8 font-poppins-regular text-[36px] leading-[42px] text-white">
            ›
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
