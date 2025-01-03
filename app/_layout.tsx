import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/auth";
import { PaperProvider } from "react-native-paper";

// Protected Layout wrapper
const InitialLayout = () => {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(login)";

    if (user) {
      // Redirect to home if user is signed in and in auth group
      router.replace("/(tabs)");
    } else if (!user && !inAuthGroup) {
      // Redirect to sign-in if user is not signed in and trying to access protected routes
      router.replace("/(login)");
    }
  }, [user, loading, segments]);

  return <Slot />;
};

// Root Layout
export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider>
        <InitialLayout />
      </PaperProvider>
    </AuthProvider>
  );
}
