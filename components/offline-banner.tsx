import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "./ui/text";

const minHeight = 0;

export function OfflineBanner() {
  const netinfo = useNetInfo();
  const insets = useSafeAreaInsets();
  const height = useSharedValue(0);

  const isOffline = netinfo.isInternetReachable === false;
  const maxHeight = 28 + insets.bottom / 2;

  useEffect(() => {
    if (isOffline) {
      height.value = withTiming(maxHeight);
    } else {
      height.value = withTiming(minHeight);
    }
  }, [isOffline, height, maxHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: height.value,
    marginTop: interpolate(
      height.value,
      [minHeight, maxHeight],
      [minHeight, -insets.bottom + 10],
    ),
  }));

  return (
    <Animated.View style={animatedStyle}>
      <View className="h-full absolute bottom-0 left-0 right-0 bg-destructive">
        <View className="items-center py-2">
          <Text className="font-bold">App is offline</Text>
        </View>
      </View>
    </Animated.View>
  );
}
