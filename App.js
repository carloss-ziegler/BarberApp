import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/stacks/MainStack";
import UserContextProvider from "./src/contexts/UserContext";

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <MainStack />

        <StatusBar style="dark" />
      </NavigationContainer>
    </UserContextProvider>
  );
}
