import { Stack } from "expo-router";
import {ReduxProvider} from "@/app/redux/provider";

export default function RootLayout() {
  return (
      <ReduxProvider>
          <Stack screenOptions={{gestureEnabled: false}}>
              <Stack.Screen  name="(tab)" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="chatComponent" options={{ headerShown: false }} />
              <Stack.Screen name="registerSelect" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="investorRegister" options={{ headerShown: false }} />
              <Stack.Screen name="entrepRegister" options={{ headerShown: false }} />
          </Stack>
      </ReduxProvider>
  )
}

