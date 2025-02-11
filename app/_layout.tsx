import { Stack } from "expo-router";
import { Appearance } from "react-native";

import { Colors } from "@/constants/Colors";
import ThemeProvider from "./context/ThemeContext";
import TodoProvider from "./context/TodoContext";

export default function RootLayout() {
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ThemeProvider>
      <TodoProvider>
        <Stack
          screenOptions={{ headerShown: false, headerTintColor: theme.text }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="todo" />
        </Stack>
      </TodoProvider>
    </ThemeProvider>
  );
}
