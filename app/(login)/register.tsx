import { supabase } from "@/utils/supabase";
import { Link } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Text,
  Surface,
  Snackbar,
  Portal,
} from "react-native-paper";

export default function LoginScreen() {
  // const theme = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [snackbarText, setSnackbarText] = React.useState("");
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);

  async function signUpNewUser() {
    setLoading(true);

    try {
      if (displayName.length == 0) {
        throw new Error("Name is required");
      }
      if (password.length == 0) {
        throw new Error("Password is required");
      }
      if (email.length == 0) {
        throw new Error("Email is required");
      }
      if (password !== passwordConfirm) {
        throw new Error(
          "Your password did not match. Please re-check and try again"
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        setSnackbarText(`${error.message}`);
        setSnackbarVisible(true);
        setLoading(false);
        return;
      }
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayName,
        },
      },
    });
    if (error) {
      setSnackbarText(error.message);
      setSnackbarVisible(true);
      setLoading(false);
    }
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
            label='Name'
            mode='outlined'
            keyboardType='default'
            autoCapitalize='words'
            value={displayName}
            onChangeText={text => setDisplayName(text)}
            autoComplete='name'
            style={styles.input}
          />
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
            secureTextEntry
            onChangeText={text => setPassword(text)}
            style={styles.input}
          />
          <TextInput
            label='Confirm password'
            mode='outlined'
            value={passwordConfirm}
            secureTextEntry
            onChangeText={text => setPasswordConfirm(text)}
            style={styles.input}
          />

          <Button
            mode='contained'
            onPress={signUpNewUser}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Register
          </Button>

          <View style={styles.signUpContainer}>
            <Text variant='bodyMedium' style={styles.signUpText}>
              Already have account?{" "}
              <Link href='/(login)' style={styles.signUpLink}>
                Login
              </Link>
            </Text>
          </View>
        </View>
      </Surface>
      <Portal>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
        >
          {snackbarText}
        </Snackbar>
      </Portal>
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
