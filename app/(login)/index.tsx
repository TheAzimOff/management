import { Link } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseAuth, googleProvider } from "@/firebase/config";

export default function LoginScreen() {
  const handleGoogleAuth = async () => {
    signInWithPopup(firebaseAuth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        Alert.alert(user.displayName || "user");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Login</Text>
          <Text style={styles.cardDescription}>
            Enter your email below to login to your account
          </Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="m@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.passwordHeader}>
              <Text style={styles.label}>Password</Text>
              <Link href="/forgot" style={styles.forgotPassword}>
                Forgot your password?
              </Link>
            </View>
            <TextInput style={styles.input} secureTextEntry />
          </View>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <Pressable style={styles.outlineButton} onPress={handleGoogleAuth}>
            <Text style={styles.outlineButtonText}>Continue with Google</Text>
          </Pressable>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Don't have an account?{" "}
              <Link href="/register" style={styles.signUpLink}>
                Sign up
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
  card: {
    borderRadius: 8,
    padding: 16,
    width: "100%",
    elevation: 3,
    shadowColor: "#0000",
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
  },
  cardContent: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgotPassword: {
    fontSize: 12,
    color: "#18181b",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#18181b",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fafafa",
    fontSize: 16,
    fontWeight: "500",
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: "#18181b",
    borderRadius: 4,
    padding: 12,
    alignItems: "center",
  },
  outlineButtonText: {
    color: "#18181b",
    fontSize: 16,
    fontWeight: "500",
  },
  signUpContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  signUpText: {
    fontSize: 14,
    color: "#666",
  },
  signUpLink: {
    color: "#18181b",
    textDecorationLine: "underline",
  },
});
