import { Pressable, StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  useFonts,
  Inter_500Medium,
  Inter_400Regular,
} from "@expo-google-fonts/inter";

const Todo = ({ id, title, description, completed, onClick }) => {
  let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View
      style={[
        styles.listContainer,
        completed && { backgroundColor: "#E8E8E8" },
      ]}
    >
      <View style={styles.element}></View>
      <View style={styles.todo}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {description}
        </Text>
      </View>
      {completed ? (
        <Pressable onPress={() => onClick(id)}>
          <AntDesign name="checkcircleo" size={24} color="#80BBE6" />
        </Pressable>
      ) : (
        <Pressable onPress={() => onClick(id)}>
          <Entypo name="circle" size={24} color="#C6D0D0" />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: 80,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: "#E8E8E8",
    marginVertical: 5,
    flexDirection: "row",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 5,
  },
  element: {
    backgroundColor: "#80BBE6",
    width: "10",
    height: "100%",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderColor: "#80BBE6",
    borderWidth: 4,
    padding: 4,
  },
  todo: {
    width: "80%",
    marginVertical: 15,
  },
  title: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    marginBottom: 5,
  },
  description: {
    fontFamily: "Inter_400Regular",
    color: "#8B8B8B",
    fontSize: 12,
  },
});

export default Todo;
