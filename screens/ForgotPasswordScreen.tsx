// screens/ForgotPasswordScreen.tsx
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";
import { Platform, ScrollView } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSupabase } from "../context/useSupabase";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const height = useHeaderHeight();

  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showResultModal, setShowResultModal] = React.useState(false);

  const { forgotPassword } = useSupabase();

  const onFinishTapped = () => {
    setShowResultModal(false);
    navigation.navigate("Login");
  };

  const onSendTapped = async () => {
    try {
      setLoading(true);
      await forgotPassword(email);
      setShowResultModal(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <View>
            <Image
              source={{ uri: "https://i.imgur.com/sDzRjS4.png" }}
              alt="Forgot password icon"
              resizeMode="contain"
            ></Image>
            <Text>Forgot password?</Text>
            <TextInput
              placeholder="Enter your email"
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
            <Button
              disabled={loading}
              onPress={() => onSendTapped()}
              title={loading ? "Loading..." : "Send"}
            ></Button>
          </View>
        </View>
        <View>
          <View>
            If you have an account,{" "}
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View
          isVisible={showResultModal}
          onClose={() => setShowResultModal(false)}
          TitleComponent={<TitleOne>Email sent</TitleOne>}
          ConfirmButtonComponent={
            <Button onPress={() => onFinishTapped()}>Ok</Button>
          }
        ></View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
