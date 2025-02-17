import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Entypo from "@expo/vector-icons/Entypo";

import { useTheme } from "./context/ThemeContext";
import Todo from "./components/TodoComponent";
import { useTodo } from "./context/TodoContext";
import AddTodo from "./components/AddTodo";
import TodoDescription from "./components/TodoDescription";
import LoadingScreen from "./components/LoadingComponent";
import { getTodoByIdService } from "@/app/services/todoServices";
import EmptyList from "./components/EmptyList";

const TodoScreen = () => {
  const { theme } = useTheme();
  const {
    todoState: { todos, todosLoading },
    toggleTodo,
    deleteTodo,
    addTodo,
    updateTodo,
  } = useTodo();
  const [showCompleted, setShowCompleted] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [modifyTodo, setModifyTodo] = useState({
    showDetails: false,
    edit: false,
  });
  const [todoDescription, setTodoDescription] = useState(null);
  const [viewId, setViewId] = useState("");

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handleExpand = useCallback(() => {
    bottomSheetRef.current?.expand();
    setShowBottomSheet(true);
  }, []);
  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
    setShowBottomSheet(false);
  }, []);
  const bottomSheetDescriptionRef = useRef(null);

  const handleDescriptionExpand = useCallback(() => {
    bottomSheetDescriptionRef.current?.expand();
    setShowBottomSheet(true);
  }, []);
  const handleDescriptionClose = useCallback(() => {
    bottomSheetDescriptionRef.current?.close();
    setShowBottomSheet(false);
    setTodoDescription(null);
    setViewId("");
  }, []);
  const handleTodoUpdate = async ({ id, title, description }) => {
    try {
      await updateTodo({ id, title, description });
      handleDescriptionClose();
    } catch (e) {
      throw e;
    }
  };
  useEffect(() => {
    const onDescriptionLoad = async () => {
      try {
        const data = await getTodoByIdService(viewId);
        setTodoDescription(data);
      } catch (e) {
        throw e;
      }
    };

    viewId && onDescriptionLoad();
  }, [viewId]);
  const submitHandler = (data) => {
    if (data.title.trim() === "" || data.description.trim() === "") {
      return;
    }
    addTodo(data);
    handleClose();
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text></Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <GestureHandlerRootView
        style={[
          styles.bottomSheet,
          showBottomSheet && { backgroundColor: "rgba(0,0,0,0.26)" },
        ]}
      >
        {todosLoading ? (
          <LoadingScreen />
        ) : (
          <View style={styles.contentContainer}>
            <Text style={styles.header}>Todo App</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              {todos.length > 0 ? (
                <View>
                  <View
                    style={[
                      todos.filter((todo) => todo.completed).length === 0 && {
                        marginBottom: 20,
                      },
                    ]}
                  >
                    {todos.map(
                      (item, index) =>
                        !item.completed && (
                          <Todo
                            key={index}
                            {...item}
                            onClick={toggleTodo}
                            onLongPress={(id) => {
                              setModifyTodo({
                                showDetails: !modifyTodo.showDetails,
                                edit: false,
                              });
                              setViewId(id);
                              handleDescriptionExpand();
                            }}
                          />
                        )
                    )}
                  </View>

                  {todos.filter((todo) => todo.completed).length > 0 && (
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
                          {todos.map(
                            (item, index) =>
                              item.completed && (
                                <Todo
                                  key={index}
                                  {...item}
                                  onClick={toggleTodo}
                                  onLongPress={(id) => {
                                    setModifyTodo({
                                      showDetails: !modifyTodo.showDetails,
                                      edit: false,
                                    });
                                    setViewId(id);
                                    handleDescriptionExpand();
                                  }}
                                />
                              )
                          )}
                        </View>
                      )}
                    </>
                  )}
                </View>
              ) : (
                <EmptyList />
              )}
            </ScrollView>

            <Pressable style={styles.addTaskButton} onPress={handleExpand}>
              <Text style={styles.buttonText}>Add Task</Text>
            </Pressable>
          </View>
        )}
        <BottomSheet
          index={-1}
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          handleComponent={null}
        >
          <BottomSheetView style={styles.bottomSheetView}>
            <AddTodo onClose={handleClose} onSubmit={submitHandler} />
          </BottomSheetView>
        </BottomSheet>
        <BottomSheet
          index={-1}
          ref={bottomSheetDescriptionRef}
          snapPoints={snapPoints}
          handleComponent={null}
        >
          <BottomSheetView style={styles.bottomSheetView}>
            <TodoDescription
              onClose={handleDescriptionClose}
              onSubmit={(data) => handleTodoUpdate(data)}
              renderData={todoDescription}
              onDelete={(id) => {
                deleteTodo(id);
                setTodoDescription(null);
                handleDescriptionClose();
              }}
              id={viewId}
            />
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    flex: 1,
    position: "relative",
  },
  contentContainer: {
    padding: 15,
    flex: 1,
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
  buttonText: {
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#FFFCFC",
  },
  bottomSheet: {
    flex: 1,
    zIndex: 100,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  bottomSheetHeaderTitle: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
  closeButton: {
    backgroundColor: "#BDBDBD",
    borderRadius: "50%",
    paddingVertical: 4,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  addTaskTitles: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    marginTop: 15,
  },
  taskForm: {
    gap: 5,
  },
  formInputs: {
    padding: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#D7D7D7",
    fontFamily: "Inter_400Regular",
    fontSize: 14,
  },
  submitButton: {
    backgroundColor: "#4884AE",
    padding: 15,
    borderRadius: 5,
    alignSelf: "center",
    width: "100%",
  },
  bottomSheetContent: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "90%",
    width: "100%",
  },
  bottomSheetView: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    paddingBottom: 5,
    zIndex: 20,
  },
});

export default TodoScreen;
