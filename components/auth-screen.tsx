import { useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Redirect, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth, useSignIn, useSignUp } from "@clerk/expo";
import { useSSO } from "@clerk/expo/experimental";
import { images } from "../constants/images";

type AuthMode = "sign-up" | "sign-in";

type AuthScreenProps = {
  mode: AuthMode;
};

const verificationDigits = Array.from({ length: 6 }, (_, index) => index);

export function AuthScreen({ mode }: AuthScreenProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const { signIn, fetchStatus: signInFetchStatus } = useSignIn();
  const { signUp, fetchStatus: signUpFetchStatus } = useSignUp();
  const { startSSOFlow } = useSSO();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const codeInputRef = useRef<TextInput>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationVisible, setVerificationVisible] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignUp = mode === "sign-up";
  const isBusy =
    isSubmitting ||
    signInFetchStatus === "fetching" ||
    signUpFetchStatus === "fetching";

  function goBack() {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(isSignUp ? "/onboarding" : "/sign-up");
  }

  function setErrorFromClerk(error: { message: string; longMessage?: string }) {
    setAuthError(error.longMessage ?? error.message);
  }

  async function submitEmail() {
    const emailAddress = email.trim();
    if (!emailAddress) {
      setAuthError("Enter your email address to continue.");
      return;
    }

    if (isSignUp && !password) {
      setAuthError("Enter a password to create your account.");
      return;
    }

    setAuthError(null);
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        const { error } = await signUp.password({ emailAddress, password });
        if (error) {
          setErrorFromClerk(error);
          return;
        }

        if (signUp.status === "complete") {
          const { error: finalizeError } = await signUp.finalize();
          if (finalizeError) {
            setErrorFromClerk(finalizeError);
            return;
          }
          router.replace("/");
          return;
        }

        const { error: sendError } =
          await signUp.verifications.sendEmailCode();
        if (sendError) {
          setErrorFromClerk(sendError);
          return;
        }
      } else {
        const { error } = await signIn.emailCode.sendCode({ emailAddress });
        if (error) {
          setErrorFromClerk(error);
          return;
        }
      }

      setVerificationCode("");
      setVerificationVisible(true);
    } catch (error) {
      setAuthError(
        error instanceof Error
          ? error.message
          : "We couldn't start authentication. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function updateVerificationCode(value: string) {
    const nextCode = value
      .replace(/\D/g, "")
      .slice(0, verificationDigits.length);
    setVerificationCode(nextCode);
    setAuthError(null);

    if (nextCode.length !== verificationDigits.length || isBusy) {
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = isSignUp
        ? await signUp.verifications.verifyEmailCode({ code: nextCode })
        : await signIn.emailCode.verifyCode({ code: nextCode });

      if (error) {
        setErrorFromClerk(error);
        return;
      }

      const { error: finalizeError } = isSignUp
        ? await signUp.finalize()
        : await signIn.finalize();

      if (finalizeError) {
        setErrorFromClerk(finalizeError);
        return;
      }

      setVerificationVisible(false);
      router.replace("/");
    } catch (error) {
      setAuthError(
        error instanceof Error
          ? error.message
          : "We couldn't verify that code. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function resendVerificationCode() {
    setAuthError(null);
    setIsSubmitting(true);
    try {
      const { error } = isSignUp
        ? await signUp.verifications.sendEmailCode()
        : await signIn.emailCode.sendCode();

      if (error) {
        setErrorFromClerk(error);
      }
    } catch (error) {
      setAuthError(
        error instanceof Error
          ? error.message
          : "We couldn't resend the code. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function showSocialSignIn(
    strategy: "oauth_google" | "oauth_facebook" | "oauth_apple",
  ) {
    setAuthError(null);
    setIsSubmitting(true);
    try {
      const { createdSessionId } = await startSSOFlow({ strategy });
      if (createdSessionId) {
        router.replace("/");
      }
    } catch (error) {
      setAuthError(
        error instanceof Error
          ? error.message
          : "We couldn't sign in with this provider. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
      style={{ paddingTop: insets.top }}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          className="flex-1 px-6"
          style={{ paddingBottom: Math.max(insets.bottom, 120) }}
        >
          {isSignUp && <View nativeID="clerk-captcha" />}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={goBack}
            className="mt-3 h-10 w-10 items-center justify-center"
          >
            <Text className="font-poppins-regular text-[36px] leading-[40px] text-[#0D132B]">
              ‹
            </Text>
          </Pressable>

          <View className="mt-4">
            <Text className="font-poppins-semibold text-[27px] leading-[36px] text-[#0D132B]">
              {isSignUp ? "Create your account" : "Welcome back"}
            </Text>
            <Text className="mt-2 font-poppins-regular text-[16px] leading-6 text-[#6B7280]">
              {isSignUp
                ? "Start your language journey today ✨"
                : "Continue your language journey"}
            </Text>
          </View>

          <View className="relative -mb-1 h-[132px] items-center">
            <Text className="absolute left-[22%] top-7 font-poppins-semibold text-[20px] text-[#FF9D00]">
              ✦
            </Text>
            <Text className="absolute right-[18%] top-9 font-poppins-semibold text-[20px] text-[#75B8FF]">
              ✦
            </Text>
            <Text className="absolute right-[23%] top-[72px] font-poppins-semibold text-[17px] text-[#FFD640]">
              ✦
            </Text>
            <Image
              source={images.mascotAuth}
              resizeMode="contain"
              accessibilityLabel="Lingua fox mascot"
              style={{
                position: "absolute",
                bottom: -38,
                height: 205,
                width: 205,
              }}
            />
          </View>

          <View className="z-10 gap-3">
            <View className="h-[80px] justify-center rounded-[18px] border-2 border-[#F0F1F5] px-5">
              <Text className="font-poppins-regular text-[13px] leading-5 text-[#6B7280]">
                Email
              </Text>
              <TextInput
                accessibilityLabel="Email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                className="mt-1 p-0 font-poppins-regular text-[16px] leading-6 text-[#0D132B]"
                keyboardType="email-address"
                onChangeText={(value) => {
                  setEmail(value);
                  setAuthError(null);
                }}
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                returnKeyType="done"
                textContentType="emailAddress"
                value={email}
              />
            </View>

            {isSignUp && (
              <View className="h-[80px] flex-row items-center rounded-[18px] border-2 border-[#F0F1F5] px-5">
                <View className="flex-1 justify-center">
                  <Text className="font-poppins-regular text-[13px] leading-5 text-[#6B7280]">
                    Password
                  </Text>
                  <TextInput
                    accessibilityLabel="Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    className="mt-1 p-0 font-poppins-regular text-[16px] leading-6 text-[#0D132B]"
                    onChangeText={(value) => {
                      setPassword(value);
                      setAuthError(null);
                    }}
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!passwordVisible}
                    textContentType="newPassword"
                    value={password}
                  />
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    passwordVisible ? "Hide password" : "Show password"
                  }
                  accessibilityState={{ selected: passwordVisible }}
                  onPress={() => setPasswordVisible((visible) => !visible)}
                  className="ml-3 h-10 w-10 items-center justify-center"
                >
                  <View className="h-[15px] w-[23px] items-center justify-center rounded-full border border-[#64748B]">
                    <View className="h-[7px] w-[7px] rounded-full bg-[#64748B]" />
                  </View>
                </Pressable>
              </View>
            )}

            {authError && !verificationVisible && (
              <Text
                accessibilityRole="alert"
                className="font-poppins-regular text-[13px] leading-5 text-[#DC2626]"
              >
                {authError}
              </Text>
            )}

            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: isBusy }}
              disabled={isBusy}
              onPress={() => void submitEmail()}
              className={`h-[58px] items-center justify-center rounded-[16px] border border-[#5B3BF6] bg-lingua-deep-purple ${
                isBusy ? "opacity-60" : ""
              }`}
            >
              <Text className="font-poppins-semibold text-[17px] text-white">
                {isBusy ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
              </Text>
            </Pressable>
          </View>

          <View className="mt-6 mb-3 flex-row items-center gap-3">
            <View className="h-[2px] flex-1 bg-[#ECEEF2]" />
            <Text className="font-poppins-regular text-[14px] text-[#6B7280]">
              or continue with
            </Text>
            <View className="h-[2px] flex-1 bg-[#ECEEF2]" />
          </View>

          <View className="gap-2">
            <SocialButton
              disabled={isBusy}
              label="Continue with Google"
              onPress={() => void showSocialSignIn("oauth_google")}
              provider="google"
            />
            <SocialButton
              disabled={isBusy}
              label="Continue with Facebook"
              onPress={() => void showSocialSignIn("oauth_facebook")}
              provider="facebook"
            />
            <SocialButton
              disabled={isBusy}
              label="Continue with Apple"
              onPress={() => void showSocialSignIn("oauth_apple")}
              provider="apple"
            />
          </View>

          <View className="mt-auto flex-row flex-wrap items-center justify-center gap-x-1 pt-12">
            <Text className="font-poppins-regular text-[14px] text-[#6B7280]">
              {isSignUp
                ? "Already have an account?"
                : "Don't have an account?"}
            </Text>
            <Pressable
              accessibilityRole="link"
              onPress={() =>
                router.replace(isSignUp ? "/sign-in" : "/sign-up")
              }
              hitSlop={8}
            >
              <Text className="font-poppins-medium text-[14px] text-[#4E2BF5]">
                {isSignUp ? "Log in" : "Sign up"}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        onRequestClose={() => setVerificationVisible(false)}
        presentationStyle="overFullScreen"
        statusBarTranslucent
        transparent
        visible={verificationVisible}
        onShow={() => codeInputRef.current?.focus()}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-center px-6"
          style={{ backgroundColor: "rgba(13, 19, 43, 0.42)" }}
        >
          <View className="rounded-[24px] bg-white px-6 pb-7 pt-8">
            <Text className="text-center font-poppins-semibold text-[22px] leading-8 text-[#0D132B]">
              Check your email
            </Text>
            <Text className="mt-2 text-center font-poppins-regular text-[14px] leading-[22px] text-[#6B7280]">
              We sent a verification code to {email.trim()}. Enter the 6-digit
              code to continue.
            </Text>

            <View className="relative mt-7 flex-row justify-center gap-2">
              {verificationDigits.map((digit) => (
                <View
                  key={digit}
                  className={`h-[52px] w-[42px] items-center justify-center rounded-[12px] border-2 ${
                    digit === Math.min(verificationCode.length, 5)
                      ? "border-[#6C4EF5] bg-[#F7F5FF]"
                      : "border-[#E5E7EB] bg-white"
                  }`}
                >
                  <Text className="font-poppins-semibold text-[20px] text-[#0D132B]">
                    {verificationCode[digit] ?? ""}
                  </Text>
                </View>
              ))}
              <TextInput
                ref={codeInputRef}
                accessibilityLabel="6-digit verification code"
                accessibilityHint="Enter the code from your email"
                autoFocus
                className="absolute inset-0 h-full w-full opacity-0"
                keyboardType="number-pad"
                maxLength={6}
                onChangeText={(value) => void updateVerificationCode(value)}
                textContentType="oneTimeCode"
                value={verificationCode}
              />
            </View>

            {authError && (
              <Text
                accessibilityRole="alert"
                className="mt-3 text-center font-poppins-regular text-[13px] leading-5 text-[#DC2626]"
              >
                {authError}
              </Text>
            )}

            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: isBusy }}
              disabled={isBusy}
              onPress={() => void resendVerificationCode()}
              className="mt-5 items-center py-2"
            >
              <Text className="font-poppins-medium text-[14px] text-[#4E2BF5]">
                Resend code
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={() => setVerificationVisible(false)}
              className="mt-1 items-center py-2"
            >
              <Text className="font-poppins-medium text-[14px] text-[#6B7280]">
                Cancel
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </KeyboardAvoidingView>
  );
}

type SocialButtonProps = {
  disabled: boolean;
  label: string;
  onPress: () => void;
  provider: "google" | "facebook" | "apple";
};

function SocialButton({
  disabled,
  label,
  onPress,
  provider,
}: SocialButtonProps) {
  const logo = {
    google: images.googleLogo,
    facebook: images.facebookLogo,
    apple: images.appleLogo,
  }[provider];
  const logoSize = {
    google: 30,
    facebook: 21,
    apple: 36,
  }[provider];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      className={`h-[54px] flex-row items-center justify-center rounded-[17px] border-2 border-[#F0F1F5] bg-white ${
        disabled ? "opacity-60" : ""
      }`}
    >
      <View className="absolute left-[20%] h-8 w-8 items-center justify-center">
        <Image
          source={logo}
          resizeMode="contain"
          accessibilityLabel={`${provider} logo`}
          style={{ height: logoSize, width: logoSize }}
        />
      </View>
      <Text className="font-poppins-regular text-[15px] text-[#0D132B]">
        {label}
      </Text>
    </Pressable>
  );
}
