import "react-native-reanimated";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
import "../global.css";
import { Slot } from "expo-router";

import { Provider } from "react-redux";
import { store } from "@/store";
import { ToastProvider } from "react-native-toast-notifications";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    FootspringRegular: require("../assets/fonts/Fontspring-DEMO-blue_vinyl_regular_ps_ot.otf"),
    FootspringBold: require("../assets/fonts/Fontspring-DEMO-blue_vinyl_bold_ps_ot.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ToastProvider>
            <Slot />
          </ToastProvider>
        </GestureHandlerRootView>
      </SafeAreaView>
    </Provider>
  );
}
