import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// REPLACE THESE VALUES with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxDy6JBpEJaRTYOJs03nwUAdUHdghRn10",
  authDomain: "eurovision-f26b6.firebaseapp.com",
  projectId: "eurovision-f26b6",
  storageBucket: "eurovision-f26b6.firebasestorage.app",
  messagingSenderId: "792172036315",
  appId: "1:792172036315:web:a3c5ddaf8ebe1a077c4cfe",
  measurementId: "G-ST4DG1WH5T"
};

// Initialize Firebase only if the config is provided
const isConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY";

const app = isConfigured ? initializeApp(firebaseConfig) : null;
export const db = app ? getFirestore(app) : null;

export const COMPETITORS_COLLECTION = "competitors_2026";
export const VOTES_COLLECTION = "votes_2026";
export const SETTINGS_COLLECTION = "settings_2026";

// Helper to check if we are in mock mode
export const isMockMode = !isConfigured;
