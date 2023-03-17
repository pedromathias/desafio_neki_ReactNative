import { ThemeProvider } from "styled-components";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Routes } from "./src/routes/index";
import { Login } from "./src/screens/Login";
import theme from "./src/theme";
import { DataProvider } from "./src/context/dataContext";
import { AuthProvider } from "./src/context/Auth";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <DataProvider>
          <Routes />
        </DataProvider>
      </NavigationContainer>
    </AuthProvider>
  );
}
