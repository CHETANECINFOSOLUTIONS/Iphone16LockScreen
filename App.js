import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ImageBackground } from "react-native";
import wrapper from "./assets/images/wallpaper.webp";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect, useMemo } from "react";
import dayjs from "dayjs";
import NotificationsList from "./src/components/NotiFicationsList";
import Animated, {
  SlideInUp,
  SlideInDown,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  useDerivedValue,
} from "react-native-reanimated";
import SwipeUpToOpen from "./src/components/SwipeUpToOpen";
export default function App() {
  const [date, setDate] = useState(dayjs());

  const footerVisibility = useSharedValue(1);
  const footerHeight = useDerivedValue(() =>
    interpolate(footerVisibility.value, [0, 1], [0, 85])
  );

  const animatedFooterStyles = useAnimatedStyle(() => ({
    marginTop: interpolate(footerVisibility.value, [0, 1], [-85, 0]),
    opacity: footerVisibility.value,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(dayjs());
    }, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  const Header = useMemo(
    () => (
      <Animated.View entering={SlideInUp} style={styles.header}>
        <Ionicons name="ios-lock-closed" size={24} color="white" />
        <Text style={styles.date}>{date.format("dddd, DD MMMM")}</Text>
        <Text style={styles.time}>{date.format("hh:mm")}</Text>
      </Animated.View>
    ),
    [date]
  );
  return (
    <ImageBackground source={wrapper} style={StyleSheet.absoluteFillObject}>
      <NotificationsList
        footerHeight={footerHeight}
        footerVisibility={footerVisibility}
        ListHeaderComponent={Header}
      />

      <Animated.View
        entering={SlideInDown}
        style={[styles.footer, animatedFooterStyles]}
      >
        <View style={styles.icon}>
          <MaterialCommunityIcons name="flashlight" size={24} color="white" />
        </View>
        <SwipeUpToOpen />
        <View style={styles.icon}>
          <Ionicons name="ios-camera" size={24} color="white" />
        </View>
      </Animated.View>
      <StatusBar style="light" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    // justifyContent: "center",
    height: 250,
    // marginTop: 50,
  },
  date: {
    color: "#C3FFFE",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 20,
  },
  time: {
    fontSize: 82,
    fontWeight: "bold",
    color: "#C3FFFE",
  },
  footer: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignSelf: "stretch",
    marginBottom: 10,
    height: 75,
  },
  icon: {
    backgroundColor: "#00000050",
    width: 50,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    // overflow: "hidden",
  },
});
