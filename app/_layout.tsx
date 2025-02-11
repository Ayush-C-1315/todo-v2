import { Stack } from "expo-router";
import { Appearance } from "react-native";

import { Colors } from "@/constants/Colors";
import { ThemeProvider } from "./context/ThemeContext";

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ThemeProvider>
      <Stack
        screenOptions={{ headerShown: false, headerTintColor: theme.text }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </ThemeProvider>
  );
}
