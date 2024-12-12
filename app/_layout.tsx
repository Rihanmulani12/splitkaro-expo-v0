import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from 'expo-router';
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useCallback } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemeProvider as RestyleThemeProvider } from "@shopify/restyle";
import { theme, darkTheme } from "../constants/Theme/theme";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme(); // Light or dark mode
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const handleFontsLoaded = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    handleFontsLoaded();
  }, [handleFontsLoaded]);

  if (!fontsLoaded) {
    return null; // You could return a custom loader here if needed
  }

  // Select the theme based on color scheme
  const navigationTheme = colorScheme === "dark" ? DarkTheme : DefaultTheme;
  const appTheme = colorScheme === "dark" ? darkTheme : theme;

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <RestyleThemeProvider theme={appTheme}>
       <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />

       </Stack>
        
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </RestyleThemeProvider>
    </NavigationThemeProvider>
  );
}
