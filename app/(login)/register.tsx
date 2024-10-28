import { supabase } from "@/utils/supabase";
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

export default function LoginScreen() {
  const [loading, setLoading] = React.useState(true);
  const [displayName, setDisplayName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  async function signUpNewUser() {
    setLoading(true);
    if (password.length == 0 || email.length == 0) {
      Alert.alert("Error", "Fill all the areas");
      return;
    }
    if (password !== passwordConfirm) {
      Alert.alert("Error", "Your password doesn't match");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayName,
        },
      },
    });
    if (error) {
      Alert.alert(error.name, error.message);
      return;
    }
    if (data) {
      Alert.alert("success", data.user?.user_metadata.displayName);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Register</Text>
          <Text style={styles.cardDescription}>
            Enter your email below to register new account
          </Text>
        </View>
        <View style={styles.cardContent}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder='John Doe'
              autoCapitalize='words'
              value={displayName}
              onChangeText={text => setDisplayName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder='m@example.com'
              keyboardType='email-address'
              autoCapitalize='none'
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.passwordHeader}>
              <Text style={styles.label}>Password</Text>
            </View>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.passwordHeader}>
              <Text style={styles.label}>Confirm your password</Text>
            </View>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={passwordConfirm}
              onChangeText={text => setPasswordConfirm(text)}
            />
          </View>
          <Pressable style={styles.button} onPress={signUpNewUser}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Already have account?{" "}
              <Link href='/(login)' style={styles.signUpLink}>
                Login
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
