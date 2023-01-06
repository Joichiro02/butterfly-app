import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Follow from "./home/Follow";
import MainPage from "./home/MainPage";
import Moment from "./home/Moment";
import Date from "./home/Date";
import Photography from "./home/Photography";
import { useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();
const mainTopNavigation = ["关注", "首页", "动态", "约会", "写真"];

const HomeTabScreen = () => {
  return (
    // <View style={styles.container}>
    <MyTabs />
    // </View>
  );
};

export default HomeTabScreen;

function MyTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      // tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{
        tabBarLabelStyle: { fontSize: 10 },
        // tabBarItemStyle: { width: 30 },
        tabBarStyle: { backgroundColor: "powderblue", marginTop: insets.top },
      }}
    >
      <Tab.Screen name="关注" component={Follow} />
      <Tab.Screen name="首页" component={MainPage} />
      <Tab.Screen name="动态" component={Moment} />
      <Tab.Screen name="约会" component={Date} />
      <Tab.Screen name="写真" component={Photography} />
    </Tab.Navigator>
  );
}

function MyTabBar({ state, descriptors, navigation, position }: any) {
  return (
    <View style={{ flexDirection: "row", marginTop: 50 }}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_: any, i: any) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i: any) => (i === index ? 1 : 0)),
        });

        const color = useAnimatedStyle(() => {
          return {
            color: "coral",
          };
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Animated.Text style={[{ opacity }, color]}>{label}</Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});
