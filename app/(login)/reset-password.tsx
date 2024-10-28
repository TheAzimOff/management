import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Surface, Text } from "react-native-paper";

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    // Implement your reset password logic here
    console.log("New password:", email);
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.card} elevation={0}>
        <View style={styles.cardHeader}>
          <Text variant='headlineMedium' style={styles.cardTitle}>
            Reset password
          </Text>
          <Text variant='bodyMedium' style={styles.cardDescription}>
            Enter your email below to send email for resetting your password
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

          <Button
            mode='contained'
            onPress={handleResetPassword}
            style={styles.button}
          >
            Send
          </Button>
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
  button: {
    padding: 4,
    marginTop: 8,
  },
});
