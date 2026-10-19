import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { images } from "../constants/images";
import { supportedLanguages } from "../data/languages";

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();
  const [selectedLanguageId, setSelectedLanguageId] = useState("spanish");
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase();
  const filteredLanguages = supportedLanguages.filter((language) =>
    [language.name, language.nativeName, language.code].some((value) =>
      value.toLocaleLowerCase().includes(normalizedSearchQuery),
    ),
  );

  return (
    <View className="flex-1 bg-[#F6F7FB]" style={{ paddingTop: insets.top }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="dark" />

      <View className="px-5 pb-0">
        <View className="mb-5 flex-row items-center justify-between">
          <Pressable
            accessibilityRole="button"
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center"
          >
            <Text className="font-poppins-medium text-[32px] leading-[32px] text-[#0D132B]">
              ‹
            </Text>
          </Pressable>

          <Text className="font-poppins-semibold text-[30px] leading-[38px] text-[#0D132B]">
            Choose a language
          </Text>

          <View className="h-10 w-10" />
        </View>

        <View className="mb-6 flex-row items-center rounded-full bg-[#EEF1F6] px-5 py-4">
          <Text className="mr-3 text-[24px] text-[#5E6473]">⌕</Text>
          <TextInput
            accessibilityLabel="Search languages"
            autoCapitalize="none"
            autoCorrect={false}
            className="flex-1 font-poppins-medium text-[20px] leading-[26px] text-[#0D132B]"
            onChangeText={setSearchQuery}
            placeholder="Search languages"
            placeholderTextColor="#7C8191"
            returnKeyType="search"
            value={searchQuery}
          />
        </View>

        <Text className="font-poppins-semibold text-[22px] leading-[28px] text-[#0D132B]">
          Popular
        </Text>
      </View>

      <ScrollView
        className="mt-3 flex-1 px-5"
        contentContainerClassName="pb-4"
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
      >
        {filteredLanguages.length > 0 ? (
          filteredLanguages.map((language) => {
            const isSelected = language.id === selectedLanguageId;

            return (
              <Pressable
                key={language.id}
                accessibilityRole="button"
                onPress={() => setSelectedLanguageId(language.id)}
                className={[
                  "mb-2 flex-row items-center rounded-[20px] border px-4 py-3",
                  isSelected
                    ? "border-[#7D5CF5] bg-[#F7F4FF]"
                    : "border-[#E5E7EB] bg-white",
                ].join(" ")}
              >
                <View className="mr-4 h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#E7E8EE] bg-[#F5F5F5]">
                  <Image
                    source={{ uri: language.flag }}
                    style={{ width: 30, height: 30, borderRadius: 15 }}
                    resizeMode="cover"
                  />
                </View>

                <View className="flex-1">
                  <Text className="font-poppins-semibold text-[22px] leading-[28px] text-[#0D132B]">
                    {language.name}
                  </Text>
                  <Text className="font-poppins-regular text-[15px] leading-[22px] text-[#6B7280]">
                    {language.learners} learners
                  </Text>
                </View>

                {isSelected ? (
                  <View className="ml-3 h-8 w-8 items-center justify-center rounded-full bg-[#6C4EF5]">
                    <Text className="font-poppins-bold text-[18px] leading-[18px] text-white">
                      ✓
                    </Text>
                  </View>
                ) : (
                  <Text className="ml-3 font-poppins-medium text-[30px] leading-[30px] text-[#9CA3AF]">
                    ›
                  </Text>
                )}
              </Pressable>
            );
          })
        ) : (
          <Text className="rounded-[20px] bg-white px-5 py-6 text-center font-poppins-medium text-[16px] leading-[24px] text-[#6B7280]">
            No languages found. Try another search.
          </Text>
        )}
      </ScrollView>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push("/")}
        className="mx-5 mb-3 mt-1 flex-row items-center justify-center rounded-[22px] border border-[#E5E7EB] bg-white px-4 py-4"
      >
        <Text className="font-poppins-semibold text-[18px] leading-[24px] text-[#0D132B]">
          Confirm language
        </Text>
      </Pressable>

      <View
        className="w-full items-center overflow-hidden"
        style={{ height: 150, paddingHorizontal: 12, paddingBottom: 8 }}
      >
        <Image
          source={images.earth}
          resizeMode="contain"
          style={{
            position: "absolute",
            top: -(screenWidth - 24) * 0.34,
            width: screenWidth - 24,
            height: screenWidth - 24,
          }}
          accessibilityLabel="Earth illustration showing global destinations"
        />
      </View>
    </View>
  );
}
