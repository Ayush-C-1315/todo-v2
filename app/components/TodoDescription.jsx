import AntDesign from "@expo/vector-icons/AntDesign";

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
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useEffect, useState } from "react";

const TodoDescription = ({ onClose, onSubmit, onDelete, renderData }) => {
  const [todoData, setNewTodo] = useState(null);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  useEffect(() => {
    setNewTodo((prev) => renderData);
  }, [renderData]);

  const getDateAndTimeString = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const logDate = new Date(date);
    return `${logDate.getDate()} ${
      months[logDate.getMonth()]
    } ${logDate.getFullYear()}`;
  };
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text></Text>
      </View>
    );
  }
  const submitHandler = () => {
    if (todoData?.title.trim() !== "" || todoData?.description.trim() !== "") {
      onSubmit(todoData);
    }
    setNewTodo(null);
  };
  return (
    <View style={styles.container}>
      <View style={styles.bottomSheetHeader}>
        <Text style={styles.bottomSheetHeaderTitle}>TodoDescription</Text>
        <Pressable onPress={onClose}>
          <View style={styles.closeButton}>
            <AntDesign name="close" size={16} color="black" />
          </View>
        </Pressable>
      </View>
      <View style={styles.bottomSheetContent}>
        <View style={styles.taskForm}>
          <Text style={[styles.addTaskTitles, { marginTop: 0 }]}>
            Created At:{" "}
            {todoData ? getDateAndTimeString(todoData?.createdAt) : ""}
          </Text>
          <Text style={styles.addTaskTitles}>Title</Text>
          <TextInput
            onChangeText={(e) => setNewTodo({ ...todoData, title: e })}
            placeholder="Enter the title of your task"
            style={styles.formInputs}
            placeholderTextColor={"#BEBEBE"}
            value={todoData?.title ?? ""}
          ></TextInput>
          <Text style={styles.addTaskTitles}>Description</Text>
          <TextInput
            onChangeText={(e) => setNewTodo({ ...todoData, description: e })}
            placeholder="Enter the description of your task"
            style={styles.formInputs}
            placeholderTextColor={"#BEBEBE"}
            multiline={true}
            numberOfLines={4}
            value={todoData?.description ?? ""}
          ></TextInput>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Text
            numberOfLines={5}
            style={[styles.addTaskTitles, { marginTop: 0 }]}
          >
            Status:
          </Text>
          <Text>{todoData?.completed ? "Completed" : "Pending"}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={submitHandler} style={styles.submitButton}>
            <Text style={styles.buttonText}>
              <AntDesign name="edit" size={24} color="white" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: "red" }]}
            onPress={() => onDelete(renderData?.id)}
          >
            <Text style={styles.buttonText}>
              <AntDesign name="delete" size={24} color="white" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    flex: 1,
    position: "relative",
    width: "100%",
  },
  picker: {
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "40%",
    padding: 15,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  buttonText: {
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#FFFCFC",
  },
  bottomSheet: {
    flex: 1,
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
    width: "45%",
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
  },
});

export default TodoDescription;
