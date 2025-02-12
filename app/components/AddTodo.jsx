import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { useState } from "react";

const AddTodo = ({ onClose, onSubmit }) => {
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text></Text>
      </View>
    );
  }
  const submitHandler = () => {
    if (newTodo.title.trim() !== "" || newTodo.description.trim() !== "") {
      onSubmit(newTodo);
    }
    setNewTodo({ title: "", description: "" });
  };
  return (
    <View style={styles.container}>
      <View style={styles.bottomSheetHeader}>
        <Text style={styles.bottomSheetHeaderTitle}>New Task</Text>
        <Pressable onPress={onClose}>
          <View style={styles.closeButton}>
            <AntDesign name="close" size={16} color="black" />
          </View>
        </Pressable>
      </View>
      <View style={styles.bottomSheetContent}>
        <View style={styles.taskForm}>
          <Text style={styles.addTaskTitles}>Title</Text>
          <TextInput
            onChangeText={(e) => setNewTodo({ ...newTodo, title: e })}
            placeholder="Enter the title of your task"
            style={styles.formInputs}
            placeholderTextColor={"#BEBEBE"}
            value={newTodo.title}
          ></TextInput>
          <Text style={styles.addTaskTitles}>Description</Text>
          <TextInput
            onChangeText={(e) => setNewTodo({ ...newTodo, description: e })}
            placeholder="Enter the description of your task"
            style={styles.formInputs}
            placeholderTextColor={"#BEBEBE"}
            multiline={true}
            numberOfLines={6}
            value={newTodo.description}
          ></TextInput>
        </View>
        <Pressable onPress={submitHandler} style={styles.submitButton}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
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
  // addTaskButton: {
  //   backgroundColor: "#4884AE",
  //   padding: 15,
  //   borderRadius: 5,
  //   position: "sticky",
  //   bottom: 20,
  //   alignSelf: "center",
  //   width: "100%",
  // },
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
  },
});

export default AddTodo;
