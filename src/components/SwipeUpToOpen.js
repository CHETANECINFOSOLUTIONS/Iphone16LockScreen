import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
} from "react-native-reanimated";

const SwipeUpToOpen = () => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withRepeat(
          withSequence(
            withTiming(-20),
            withDelay(1500, withTiming(0)),
            withTiming(-20)
          ),
          -1
        ),
      },
    ],
    opacity: withRepeat(
      withSequence(
        withDelay(1500, withTiming(0)),
        withDelay(300, withTiming(1))
      ),
      -1
    ),
  }));
  return (
    <Animated.Text
      style={[
        {
          color: "white",
          fontWeight: "600",
          alignSelf: "flex-end",
          letterSpacing: "0.5",
        },
        animatedStyle,
      ]}
    >
      Swipe up to open
    </Animated.Text>
  );
};

export default SwipeUpToOpen;

const styles = StyleSheet.create({});
