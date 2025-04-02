import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { SafeAreaView, Edge } from "react-native-safe-area-context";
import images from "@/constant/images";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useSSO } from "@clerk/clerk-expo";
import { useClerk, useUser } from "@clerk/clerk-expo";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();
const SignIn = () => {
  useWarmUpBrowser();
  const { signOut } = useClerk();
  const { startSSOFlow } = useSSO();
  const widthWindow = Dimensions.get("window").width;
  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          redirectUrl: AuthSession.makeRedirectUri(),
        });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, []);
  return (
    <View className="flex-1 justify-center items-center">
      <Image
        className="w-full h-full absolute top-0 right-0 bottom-0 left-0"
        source={images.wallpaper}
      />
      <View
        style={{ width: widthWindow * 0.9 }}
        className="bg-white p-5 rounded-2xl"
      >
        <View className="items-center scale-125">
          <Image
            className="size-24"
            source={images.logoLogIn}
          />
        </View>
        <Text className="font-Inter-SemiBold text-2xl text-center">
          Sign in to your account!
        </Text>
        <TouchableOpacity
          onPress={onPress}
          className="flex-row items-center justify-center bg-[rgba(0,0,0,0.05)] rounded-xl py-4  mt-6"
        >
          <Image
            className="w-6 h-6"
            source={images.google}
          />
          <Text className="ml-2 font-Inter-SemiBold text-xl">
            Sign in with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="mt-2 flex-row justify-center bg-[rgba(0,0,0,0.05)] rounded-xl py-4  items-center">
          <Image
            className="w-6 h-6 scale-125"
            source={images.github}
          />
          <Text className="ml-2 font-Inter-SemiBold text-xl">
            Sign in with Github
          </Text>
        </TouchableOpacity>
        <View className="flex-row justify-center items-center py-2 mt-4">
          <View className="h-[1px] flex-1 bg-slate-200"></View>
          <Text className="px-4">Or continue with</Text>
          <View className="h-[1px] flex-1 bg-slate-200"></View>
        </View>
        <View className="mt-4 border border-slate-200 rounded-2xl">
          <TextInput
            className="px-4 py-4 font-Inter-Medium text-xl"
            placeholder="Email address"
          />
          <TextInput
            className="px-4 py-4 font-Inter-Medium text-xl border-t border-slate-200"
            placeholder="Password"
          />
        </View>
        <TouchableOpacity>
          <Text className="font-Inter-SemiBold text-xl underline text-center my-4">
            Forgot password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-slate-950 py-5 rounded-xl mt-2">
          <Text className="text-white text-center text-xl font-Inter-SemiBold">
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;
