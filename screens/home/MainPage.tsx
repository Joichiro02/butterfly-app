import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const { height, width } = Dimensions.get("window");

const navigationList = [
  "精选",
  "最新",
  "原创",
  "自制",
  "热门",
  "国产",
  "网黄",
  "萝莉",
  "AV",
  "动漫",
];

const MainPage = () => {
  return (
    <View style={[styles.container, { backgroundColor: "cyan" }]}>
      <Text style={styles.title}>Main</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    // alignItems: "center",
    // justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  mainNavigation: {
    flexDirection: "row",
  },
  text: {
    fontSize: 12,
    marginHorizontal: 20,
  },
});

export default MainPage;
