import { useRef, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Follow from "./home/Follow";
import MainPage from "./home/MainPage";
import Moment from "./home/Moment";
import Date from "./home/Date";
import Photography from "./home/Photography";

const mainTopNavigation = ["关注", "首页", "动态", "约会", "写真"];

const { width } = Dimensions.get("window");

export default function HomeTabScreen({
  navigation,
}: RootTabScreenProps<"HomeTab">) {
  const [enabled, setEnabled] = useState(true);
  const [activeText, setActiveText] = useState(1);
  const scrollViewRef = useRef(null);
  const activePage = useSharedValue(1);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    activePage.value = Math.round(Math.round(event.contentOffset.x) / width);
    // activePage.value = event.contentOffset.x;
    // console.log(event.contentOffset.x, width * 2);
  });

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.navigationContainer}>
          <View style={styles.mainNavigation}>
            {mainTopNavigation.map((text: any, index: number) => (
              <NavigationTitle
                key={index}
                text={text}
                index={index}
                activePage={activePage}
                scrollViewRef={scrollViewRef}
                activeText={activeText}
                setActiveText={setActiveText}
                setEnabled={setEnabled}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.searchContainer} activeOpacity={1}>
            <Feather name="search" size={15} />
            <Text style={styles.text}>搜索</Text>
          </TouchableOpacity>
        </View>
        <Animated.ScrollView
          scrollEnabled={enabled}
          horizontal
          pagingEnabled
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          style={styles.scrollView}
          ref={scrollViewRef}
        >
          {mainTopNavigation.map((item: any, index: number) => (
            <HomePages
              key={index}
              title={item}
              number={index}
              activePage={activePage}
              setEnabled={setEnabled}
            />
          ))}
        </Animated.ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const NavigationTitle = ({
  text,
  index,
  activePage,
  scrollViewRef,
  activeText,
  setActiveText,
  setEnabled,
}: any) => {
  const handleScroll = () => {
    scrollViewRef?.current.scrollTo({ x: index * width, y: 0, animated: true });
    setActiveText(index);
    setEnabled(true);
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

const HomePages = ({ title, number, activePage, setEnabled }: any) => {
  //"关注", "首页", "动态", "约会", "写真"
  const pages = {
    关注: <Follow title={title} number={number} activePage={activePage} />,
    首页: (
      <MainPage
        title={title}
        number={number}
        activePage={activePage}
        setEnabled={setEnabled}
      />
    ),
    动态: <Moment title={title} number={number} activePage={activePage} />,
    约会: <Date title={title} number={number} activePage={activePage} />,
    写真: <Photography title={title} number={number} activePage={activePage} />,
  };
  //@ts-ignore
  return pages[title];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    backgroundColor: "cyan",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainNavigation: {
    flexDirection: "row",
  },
  searchContainer: {
    flexDirection: "row",
  },
  scrollView: {
    flexDirection: "row",
  },
  text: {
    fontSize: 12,
    marginHorizontal: 10,
  },
});
