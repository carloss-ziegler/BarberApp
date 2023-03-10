import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

import BarberLogo from "../../../assets/barber.svg";
import Api from "../../Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../contexts/UserContext";

const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch: userDispatch } = useContext(UserContext);

  async function handleSignUp() {
    setLoading(true);
    if (name && email && password) {
      let json = await Api.signUp(name, email, password);
      if (json.token) {
        await AsyncStorage.setItem("token", json.token);

        userDispatch({
          type: "setAvatar",
          payload: {
            avatar: json.data.avatar,
          },
        });

        navigation.reset({
          routes: [{ name: "MainTab" }],
        });
      } else {
        alert("Email ou senha incorretos!");
        setName("");
        setEmail("");
        setPassword("");
      }
    } else {
      alert("Preencha todos os campos!");
    }
    setLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="bg-[#63c2d1] flex-1 justify-center items-center"
      >
        <BarberLogo width="100%" height="160" />

        <View className="space-y-5 mt-10 w-full">
          <View className="mx-5 p-3 space-x-2 bg-[#83d6e3] rounded-lg flex-row items-center">
            <FontAwesome name="user" size={20} color="#252525" />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              className="w-[80%]"
              placeholder="Nome completo"
            />
          </View>

          <View className="mx-5 p-3 space-x-2 bg-[#83d6e3] rounded-lg flex-row items-center">
            <FontAwesome name="at" size={20} color="#252525" />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              className="w-[80%]"
              placeholder="Email"
              keyboardType="email-address"
            />
          </View>

          <View className="mx-5 p-3 space-x-2 bg-[#83d6e3] rounded-lg flex-row items-center">
            <FontAwesome name="lock" size={20} color="#252525" />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              className="w-[80%]"
              placeholder="Senha"
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            onPress={handleSignUp}
            className="py-3 mx-5 bg-[#268596] flex-row items-center justify-center rounded-lg"
          >
            {loading ? (
              <>
                <Text className="text-[#fafafa] font-semibold text-lg mr-2">
                  Registrar
                </Text>
                <ActivityIndicator color="#fafafa" />
              </>
            ) : (
              <Text className="text-[#fafafa] font-semibold text-lg">
                Registrar
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          className="flex-row justify-center items-center space-x-1 mt-4 mb-7"
        >
          <Text className="text-[#fafafa] text-sm">J?? possui uma conta?</Text>
          <Text className="text-[#fafafa] text-sm font-semibold">
            Fa??a login
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
