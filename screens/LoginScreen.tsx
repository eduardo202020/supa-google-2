import React from "react";
import { Platform, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useSupabase } from "../context/useSupabase";

import * as WebBrowser from "expo-web-browser";
import * as SecureStore from "expo-secure-store";

import * as Linking from "expo-linking";

import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const height = useHeaderHeight();
  const { login, setOAuthSession, getGoogleOAuthUrl } = useSupabase();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSignInTapped = async () => {
    try {
      setLoading(true);
      await login(email, password);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  const onSignInWithGoogle = async () => {
    setLoading(true);
    try {
      const url = await getGoogleOAuthUrl();
      if (!url) return;
      console.log({ url });

      const result = await WebBrowser.openAuthSessionAsync(
        url,
        // "exp://127.0.0.1:19000/",
        "mysupabaseappv2://google-auth?",
        // "https://www.facebook.com/",
        // "exp://128.0.0.1:8081/--/google-auth",
        {
          showInRecents: true,
        }
      );
      console.log({ result });
      // console.log(Linking.createURL("google-auth"));

      if (result.type === "success") {
        const data = extractParamsFromUrl(result.url);

        if (!data.access_token || !data.refresh_token) return;

        setOAuthSession({
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        });

        // You can optionally store Google's access token if you need it later
        SecureStore.setItemAsync(
          "google-access-token",
          JSON.stringify(data.provider_token)
        );
      }
    } catch (error) {
      // Handle error here
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const extractParamsFromUrl = (url: string) => {
    const params = new URLSearchParams(url.split("#")[1]);
    const data = {
      access_token: params.get("access_token"),
      expires_in: parseInt(params.get("expires_in") || "0"),
      refresh_token: params.get("refresh_token"),
      token_type: params.get("token_type"),
      provider_token: params.get("provider_token"),
    };

    return data;
  };

  return (
    <ScrollView style={{ paddingTop: 50 }}>
      <View>
        <View>
          <View>
            <Image
              source={{ uri: "https://i.imgur.com/FawVClJ.png" }}
              alt="Login icon"
              resizeMode="contain"
            ></Image>
            <Text>Sign in</Text>
            <TextInput
              placeholder="Enter your email"
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
            <TextInput
              placeholder="Enter your password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              disabled={loading}
              onPress={() => onSignInTapped()}
              title={loading ? "Loading..." : "Sign in"}
            />
            <Button
              disabled={loading}
              onPress={() => onSignInWithGoogle()}
              title={loading ? "Loading..." : "Sign in with Google"}
            ></Button>
          </View>
        </View>

        <View>
          <View>
            <Text> Have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
