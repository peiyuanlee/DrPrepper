import { Stack } from 'expo-router';
import { JsStack } from "./components/JsStack";
import { Easing } from "react-native-reanimated";
import { RootStackParamList } from './types';
const ANIMATION_DURATION = 600;


export default function RootLayout() {
  return (
    <JsStack   screenOptions={{
      cardOverlayEnabled: true, // Enable card overlay for transitions
      gestureEnabled: true, // Enable gesture-based navigation
      transitionSpec: {
        open: {
          animation: "timing",
          config: {
            duration: ANIMATION_DURATION,
            easing: Easing.out(Easing.ease),
          },
        },
        close: {
          animation: "timing",
          config: {
            duration: ANIMATION_DURATION,
            easing: Easing.in(Easing.ease),
          },
        },
      },
      cardStyleInterpolator: ({ current, next, layouts }) => {
        const INITIAL_TRANSLATE_X_MULTIPLIER = 1.6;
        const NEXT_TRANSLATE_X_MULTIPLIER = -0.3;
  
        // Calculate translateX for the current screen
        const translateX = current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [
            INITIAL_TRANSLATE_X_MULTIPLIER * layouts.screen.width,
            0,
          ],
          extrapolate: "clamp",
        });
  
        // Calculate translateX for the next screen (if exists)
        const nextTranslateX = next
          ? next.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [
                0,
                NEXT_TRANSLATE_X_MULTIPLIER * layouts.screen.width,
              ],
              extrapolate: "clamp",
            })
          : 0;
  
        const transform = [
          { translateX },
          { translateX: nextTranslateX },
        ];
  
        return {
          cardStyle: { transform },
        };
      },
    }}>
      <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
      <Stack.Screen name="location" options={{ title: 'Location Services' , headerShown: false}} />
      <Stack.Screen name="emergency" options={{ title: 'Emergency Alert', headerShown: false }} />
      <Stack.Screen name="events" options={{ title: 'Top 3 Events', headerShown: false }} />
      <Stack.Screen name="about" options={{ title: 'About', headerShown: false }} />
      <Stack.Screen name="profile2" options={{ title: 'Profile2', headerShown: false }} />
      <Stack.Screen name="profile3" options={{ title: 'Profile3', headerShown: false }} />
      <Stack.Screen name="profile4" options={{ title: 'Profile4', headerShown: false }} />
      <Stack.Screen name="profile5" options={{ title: 'Profile5', headerShown: false }} />
      <Stack.Screen name="profile6" options={{ title: 'Profile6', headerShown: false }} />
      <Stack.Screen name="profile7" options={{ title: 'Profile7', headerShown: false }} />
      <Stack.Screen name="profile8" options={{ title: 'Profile8', headerShown: false }} />
      <Stack.Screen name="profile9" options={{ title: 'Profile9', headerShown: false }} />
      <Stack.Screen name="checklist" options={{ title: 'Checklist', headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ title: 'Dashboard', headerShown: false }} />
      <Stack.Screen name="community" options={{ title: 'Community', headerShown: false }} />
      <Stack.Screen name="marketplace" options={{ title: 'Marketplace', headerShown: false }} />
      <Stack.Screen name="resources" options={{ title: 'Resource', headerShown: false }} />
     
    </JsStack>
  );
}

