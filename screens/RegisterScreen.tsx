// screens/RegisterScreen.tsx
// screens/RegisterScreen.tsx

import React from "react";
import { Platform, ScrollView } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSupabase } from "../context/useSupabase";

import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const height = useHeaderHeight();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { register } = useSupabase();

  const onSignUpTapped = async () => {
    try {
      setLoading(true);
      await register(email, password);
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ paddingTop: 50 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <View>
            <Image
              source={{ uri: "https://i.imgur.com/oNY0QGb.png" }}
              alt="Register icon"
              resizeMode="contain"
            ></Image>
            <Text>Sign up</Text>
            <TextInput
              placeholder="Enter your email"
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
            <TextInput
              placeholder="Enter your password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
            <Button
              disabled={loading}
              onPress={() => onSignUpTapped()}
              title={loading ? "Loading..." : "Sign up"}
            />
          </View>
        </View>
        <View>
          <View>
            <Text>If you have an account, </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
