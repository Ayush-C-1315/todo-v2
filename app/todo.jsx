import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

import { useTheme } from "./context/ThemeContext";

import Todo from "./components/TodoComponent";
import { useTodo } from "./context/TodoContext";
import { useState } from "react";

const TodoScreen = () => {
  const { theme } = useTheme();
  const styles = todoStyleSheet(theme);
  const { todoState, toggleTodo } = useTodo();
  const [showCompleted, setShowCompleted] = useState(false);

  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo App</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            todoState.filter((todo) => todo.completed).length === 0 && {
              marginBottom: 20,
            },
          ]}
        >
          {todoState.map(
            (item, index) =>
              !item.completed && (
                <Todo key={index} {...item} onClick={toggleTodo} />
              )
          )}
        </View>

        {todoState.filter((todo) => todo.completed).length > 0 && (
          <>
            <Pressable
              style={styles.completedSection}
              onPress={() => setShowCompleted(!showCompleted)}
            >
              <Text
                style={[
                  styles.completedText,
                  !showCompleted && { marginBottom: 20 },
                ]}
              >
                Completed
              </Text>
              {showCompleted ? (
                <Entypo name="chevron-up" size={24} color="black" />
              ) : (
                <Entypo name="chevron-down" size={24} color="black" />
              )}
            </Pressable>
            {showCompleted && (
              <View style={{ marginBottom: 30 }}>
                {todoState.map(
                  (item, index) =>
                    item.completed && (
                      <Todo key={index} {...item} onClick={toggleTodo} />
                    )
                )}
              </View>
            )}
          </>
        )}
      </ScrollView>
      <Pressable style={styles.addTaskButton}>
        <Text style={styles.addTaskText}>Add Task</Text>
      </Pressable>
    </View>
  );
};

const todoStyleSheet = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: "rgba(255, 255, 255, 1)",
      flex: 1,
      padding: 15,
      position: "relative",
    },
    header: {
      fontFamily: "Inter_400Regular",
      fontSize: 20,
      marginTop: 10,
      marginBottom: 20,
    },
    completedSection: {
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 10,
    },
    completedText: {
      fontFamily: "Inter_600SemiBold",
    },
    addTaskButton: {
      backgroundColor: "#4884AE",
      padding: 15,
      borderRadius: 5,
      position: "sticky",
      bottom: 20,
      alignSelf: "center",
      width: "100%",
    },
    addTaskText: {
      textAlign: "center",
      fontFamily: "Inter_600SemiBold",
      fontSize: 14,
      color: "#FFFCFC",
    },
  });

export default TodoScreen;
