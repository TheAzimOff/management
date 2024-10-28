import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { supabase } from "@/utils/supabase";

export default function Index() {
  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Link href='/(login)' style={styles.button}>
        Go to About screen
      </Link>
      <Pressable onPress={signOut}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
