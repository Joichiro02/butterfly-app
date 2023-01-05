import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAnimatedStyle } from "react-native-reanimated";

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

const MainPage = ({ title, number, activePage, setEnabled }: any) => {
  const [activeText, setActiveText] = useState(0);
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgba(0,0,256,0.${number + 2})`, width },
      ]}
    >
      <GestureHandlerRootView>
        <Animated.ScrollView
          horizontal
          onTouchStart={() => {
            setEnabled(false);
          }}
          // onMomentumScrollEnd={() => setEnabled(true)}
          onScrollAnimationEnd={() => setEnabled(true)}
          // onScrollEndDrag={() => setEnabled(true)}
        >
          <View style={{ zIndex: 10, flex: 1, backgroundColor: "coral" }}>
            <View style={styles.mainNavigation}>
              {navigationList.map((text: any, index: number) => (
                <NavigationTitle
                  key={index}
                  text={text}
                  index={index}
                  activePage={activePage}
                  activeText={activeText}
                  setActiveText={setActiveText}
                />
              ))}
            </View>
          </View>
          {/* <Text style={styles.title}>
        {title}- {number}
      </Text> */}
        </Animated.ScrollView>
      </GestureHandlerRootView>
    </View>
  );
};

const NavigationTitle = ({
  text,
  index,
  activePage,
  scrollViewRef,
  activeText,
  setActiveText,
}: any) => {
  const handleScroll = () => {
    scrollViewRef?.current.scrollTo({ x: index * width, y: 0, animated: true });
    setActiveText(index);
  };
  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: activePage.value === index ? "coral" : "transparent",
      borderBottomWidth: 2,
    };
  });
  const animatedStyleText = useAnimatedStyle(() => {
    return { color: activePage.value === index ? "#FFF" : "#000" };
  });
  return (
    <TouchableOpacity key={index} onPress={handleScroll} activeOpacity={1}>
      <Animated.View
        style={[
          {
            backgroundColor: `rgba(0,0,256,0.${index + 2})`,
            paddingBottom: 7,
            paddingTop: 3,
          },
          animatedStyle,
        ]}
      >
        <Animated.Text
          style={[
            styles.text,
            { color: activeText === index ? "#FFF" : "#000" },
            animatedStyleText,
          ]}
        >
          {text}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
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
