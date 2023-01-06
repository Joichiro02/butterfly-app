import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { height, width } = Dimensions.get("window");

const Date = () => {
  // console.log(activePage.value);
  return (
    <View style={[styles.container, { backgroundColor: "blue" }]}>
      <Text style={styles.title}>hahaha</Text>
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

export default Date;
