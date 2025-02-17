import { Link } from "expo-router";
import { Image, Pressable, Text, View, StyleSheet } from "react-native";
import { useFonts, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "./context/ThemeContext";

import heroImage from "@/assets/images/hero-image.png";
export default function Index() {
  const { theme } = useTheme();
  const styles = homeStyleSheet(theme);

  let [fontsLoaded] = useFonts({
    Inter_600SemiBold,
  });

  if (!fontsLoaded) {
    return <></>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.heroContainer}>
        <Image source={heroImage} style={styles.heroImage} />
        <View>
          <Text style={styles.heroTitle}>
            Stay Organized, Get Things Done! 🚀✅
          </Text>
          <Text style={styles.heroDescription}>
            A To-Do app helps you organize daily tasks by letting you add,
            track, and complete them easily. Stay productive and never forget
            what needs to be done!
          </Text>
        </View>
      </View>
      <Link href={"/todo"} asChild>
        <Pressable style={styles.startButton}>
          <Text style={styles.startButtonText}>Get Started !</Text>
        </Pressable>
      </Link>
      <StatusBar style={"dark"} />
    </View>
  );
}

const homeStyleSheet = (theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 1)",
      flexDirection: "column",
      padding: 15,
      flex: 2,
      overflowY: "hidden",
      overflowX: "hidden",
    },
    heroContainer: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "space-around",
      height: "60%",
      gap: 0,
    },
    heroImage: {
      height: "40%",
      resizeMode: "contain",
    },
    heroTitle: {
      fontSize: 25,
      fontWeight: "bold",
      textAlign: "center",
      fontFamily: "Inter_600SemiBold",
    },
    heroDescription: {
      textAlign: "justify",
      textOverflow: "hidden",
      marginTop: 30,
      fontFamily: "Inter_600SemiBold",
      color: "#BDBDBD",
    },
    startButton: {
      backgroundColor: theme.buttonColor,
      width: "100%",
      padding: 15,
      borderRadius: 4,
    },
    startButtonText: {
      textAlign: "center",
      color: theme.text,
      fontSize: 15,
      fontFamily: "Inter_600SemiBold",
    },
  });
