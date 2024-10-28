// First, import the required dependencies
import { User, createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

// Custom hook to handle auth state
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial auth state
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setLoading(false);
      }
    };
    getInitialSession();
  }, []);

  return {
    user,
    loading,
    signIn: async (email, password) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    },
    signOut: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
  };
};

// Example usage in a component
const AuthExample = () => {
  const { user, loading, signIn, signOut } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? (
        <>
          <p>Logged in as: {user.email}</p>
          <button onClick={signOut}>Sign Out</button>
        </>
      ) : (
        <button onClick={() => signIn("user@example.com", "password")}>
          Sign In
        </button>
      )}
    </div>
  );
};

export default AuthExample;
