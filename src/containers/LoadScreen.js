import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { ComponentStyles } from "src/common/ContainerStyles";

// loading animation page
const LoadScreen = ({ navigation }) => {
  const spinValue = new Animated.Value(0);
  const zoomValue = new Animated.Value(0);
  console.disableYellowBox = true;
  // First set up animation
  const runAni = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(spinValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(zoomValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["90deg", "-90deg"],
  });

  const zoomX = zoomValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 50],
  });
  const zoomY = zoomValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 50],
  });

  useEffect(() => {
    // 3 s to change page
    const reRun = navigation.addListener("focus", () => {
      setTimeout(() => {
        console.log("This will run after 3 second!");
        navigation.navigate("DefaultContainer");
      }, 3000);
      runAni();
      console.log("refill ag");
    });

    return () => {
      //clearTimeout(timer)
      //reRun;
    };
  }, [navigation]);

  return (
    <View>
      {
        <View
          style={[
            ComponentStyles.container_v2,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Animated.Image
            source={require("src/assets/images/icon_earth.png")}
            style={{
              transform: [
                { rotate: spin },
                { scaleX: zoomX },
                { scaleY: zoomY },
              ],
              fontSize: 50,
              color: "white",
            }}
          ></Animated.Image>
        </View>
      }
    </View>
  );
};

export default LoadScreen;
