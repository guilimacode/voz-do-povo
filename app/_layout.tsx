import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="menu" options={{ headerShown: false }} />
        <Stack.Screen name="screens/register" options={{ headerShown: false }} />
        <Stack.Screen name="screens/publish" options={{ headerShown: false }} />
        <Stack.Screen name="screens/imageAdd" options={{ headerShown: false }} />
        <Stack.Screen name="screens/publicationDetail" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}