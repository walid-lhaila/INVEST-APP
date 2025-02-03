import { Stack } from "expo-router";

export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="registerSelect" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="investorRegister" options={{ headerShown: false }} />
        <Stack.Screen name="entrepRegister" options={{ headerShown: false }} />
      </Stack>
  )
}

