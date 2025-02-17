import emptyTodo from "@/assets/images/empty-task.png";
import { useFonts, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { View, Text, Image } from "react-native";
import React from "react";

const EmptyList = () => {
  let [fontsLoaded] = useFonts({
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return <></>;
  }
  return (
    <View
      style={{
        width: "100%",
        height: 300,
        gap: 10,
        alignItems: "center",
        position: "relative",
        zIndex: -1,
      }}
    >
      <Image
        source={emptyTodo}
        style={{
          zIndex: -1,
          position: "relative",
          height: "100%",
          width: "100%",
          resizeMode: "contain",
        }}
      />
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "Inter_600SemiBold",
            textAlign: "center",
            lineHeight: 35,
          }}
        >
          Your to-do list is empty—time to fill it with possibilities!
        </Text>
      </View>
    </View>
  );
};

export default EmptyList;
