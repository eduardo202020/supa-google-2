// screens/Home.tsx

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
import { useSupabase } from "../context/useSupabase";

const HomeScreen = () => {
  const { logout } = useSupabase();
  return (
    <SafeAreaView style={{ paddingTop: 50 }}>
      <Text>Welcome!</Text>
      <Image
        source={{ uri: "https://i.imgur.com/k78EnxY.png" }}
        alt="Hello icon"
        resizeMode="contain"
      ></Image>
      <Button onPress={() => logout()} title="Logout"></Button>
    </SafeAreaView>
  );
};

export default HomeScreen;
