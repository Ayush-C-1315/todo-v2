import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const App = () => {
  // ref
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleExpand = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);
  // renders
  return (
    <>
      <Pressable onPress={handleExpand}>
        <Text>Click me</Text>
      </Pressable>
      <Pressable onPress={handleClose}>
        <Text>CLosse me</Text>
      </Pressable>
      <GestureHandlerRootView style={styles.container}>
        <BottomSheet
          index={-1}
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={snapPoints}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});

export default App;
