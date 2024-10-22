import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyD8Fkc4Bunxmvza1Xs3Z_8KZCqej9Bhs1M",
  authDomain: "management-tsue.firebaseapp.com",
  projectId: "management-tsue",
  storageBucket: "management-tsue.appspot.com",
  messagingSenderId: "295525525039",
  appId: "1:295525525039:web:b22e14ae1556c4532c88da",
});

const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
