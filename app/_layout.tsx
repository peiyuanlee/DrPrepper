import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="about" options={{ title: 'About' }} />
      <Stack.Screen name="profile2" options={{ title: 'Profile2' }} />
      <Stack.Screen name="profile3" options={{ title: 'Profile3' }} />
      <Stack.Screen name="profile4" options={{ title: 'Profile4' }} />
      <Stack.Screen name="profile5" options={{ title: 'Profile5' }} />
      <Stack.Screen name="profile6" options={{ title: 'Profile6' }} />
      <Stack.Screen name="profile7" options={{ title: 'Profile7' }} />
      <Stack.Screen name="profile8" options={{ title: 'Profile8' }} />
      <Stack.Screen name="profile9" options={{ title: 'Profile9' }} />
    </Stack>
  );
}

