import { supabase } from "@/utils/supabase";
import { Link } from "expo-router";
import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, Surface } from "react-native-paper";

export default function LoginScreen() {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  async function signInWithEmail() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.name, error.message);

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Surface style={styles.card} elevation={0}>
        <View style={styles.cardHeader}>
          <Text variant='headlineMedium' style={styles.cardTitle}>
            Login
          </Text>
          <Text variant='bodyMedium' style={styles.cardDescription}>
            Enter your email below to login to your account
          </Text>
        </View>
        <View style={styles.cardContent}>
          <TextInput
            label='Email'
            mode='outlined'
            keyboardType='email-address'
            autoCapitalize='none'
            value={email}
            onChangeText={text => setEmail(text)}
            autoComplete='email'
            style={styles.input}
          />

          <TextInput
            label='Password'
            mode='outlined'
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            style={styles.input}
          />

          <Link href='/forgot' style={styles.forgotPassword}>
            Forgot your password?
          </Link>

          <Button
            mode='contained'
            onPress={signInWithEmail}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Login
          </Button>

          <View style={styles.signUpContainer}>
            <Text variant='bodyMedium' style={styles.signUpText}>
              Don't have an account?{" "}
              <Link href='/register' style={styles.signUpLink}>
                Sign up
              </Link>
            </Text>
          </View>
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  card: {
    borderRadius: 8,
    padding: 16,
  },
  cardHeader: {
    marginBottom: 24,
  },
  cardTitle: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  cardDescription: {
    color: "#666",
  },
  cardContent: {
    gap: 16,
  },
  input: {
    backgroundColor: "transparent",
  },
  forgotPassword: {
    fontSize: 12,
    color: "#18181b",
    textDecorationLine: "underline",
    alignSelf: "flex-end",
    marginTop: -8,
  },
  button: {
    padding: 4,
    marginTop: 8,
  },
  signUpContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  signUpText: {
    color: "#666",
  },
  signUpLink: {
    color: "#18181b",
    textDecorationLine: "underline",
  },
});
