import { Stack } from "expo-router";

export default function LoginLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='register' options={{ headerShown: false }} />
      <Stack.Screen
        name='reset-password'
        options={{ title: "Forgot Password?" }}
      />
    </Stack>
  );
}
