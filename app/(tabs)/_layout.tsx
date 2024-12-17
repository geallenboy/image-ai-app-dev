import { Tabs } from "expo-router";
import React, { useContext, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import GlobalApi from "../../services/GlobalApi";
import { UserDetailContext } from "../../context/UserDetailContext";

function TabLayout() {
  const { user }: any = useUser();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  useEffect(() => {
    user && Verifyuser();
  }, [user]);
  const Verifyuser = async () => {
    const result = await GlobalApi.GetUserInfo(
      user?.primaryEmailAddress?.emailAddress
    );
    console.log(result.data);
    if (result.data.data.length != 0) {
      setUserDetail(result.data.data[0]);
      return;
    }

    try {
      const data = {
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName
      };
      const result = await GlobalApi.CreateNewUser(data);
      console.log(result?.data.data);
      setUserDetail(result.data.data[0]);
    } catch (error) {}
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "home",
          tabBarIcon: ({ color }: any) => (
            <Ionicons name="home" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: "collection",
          tabBarIcon: ({ color }: any) => (
            <Ionicons name="folder" size={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "profile",
          tabBarIcon: ({ color }: any) => (
            <Ionicons name="person-circle" size={24} color={color} />
          )
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
