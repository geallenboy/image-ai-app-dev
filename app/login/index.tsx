import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import * as WebBrowser from "expo-web-browser";
// import loginJpeg from "@/assets/images/login.jpeg";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { TouchableOpacity } from "react-native";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/(tabs)/home", { scheme: "myapp" })
        });

      if (createdSessionId) {
        //   setActive!({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View>
      <Image
        source={"../../assets/images/login.jpeg" as any}
        style={{
          width: "100%",
          height: 450
        }}
      />
      <View style={styles.loginContainer}>
        <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
          Welcome to ImageinAI
        </Text>
        <Text
          style={{
            color: Colors.GRAY,
            textAlign: "center",
            marginTop: 15
          }}
        >
          Create Ai Art in Just on Click
        </Text>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={{ textAlign: "center", color: "white", fontSize: 17 }}>
            continue
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 13,
            color: Colors.GRAY
          }}
        >
          By Continuing yyou agree to ours teams and conditors
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  loginContainer: {
    padding: 25,
    marginTop: -20,
    backgroundColor: "white",
    height: 400,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  button: {
    width: "100%",
    padding: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 40,
    marginTop: 20
  }
});

export default LoginScreen;
