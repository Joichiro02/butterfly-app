import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { height, width } = Dimensions.get("window");

const Follow = ({ title, number, activePage }: any) => {
  // console.log(activePage.value);
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgba(0,0,256,0.${number + 2})` },
      ]}
    >
      <Text style={styles.title}>
        {title}- {number}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    width,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Follow;
