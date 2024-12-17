import React from "react";
import { FlatList, View } from "react-native";
import Header from "../../components/home/Header";
import Banner from "../../components/home/Banner";
import AiFeatured from "../../components/home/AiFeatured";
import AiModels from "../../components/home/AiModels";
import UsersCreation from "../../components/home/UsersCreation";

function home() {
  return (
    <FlatList
      data={[1]}
      style={{
        padding: 20,
        marginTop: 20
      }}
      nestedScrollEnabled={true}
      renderItem={({ item }) => {
        return (
          <View>
            <Header />
            <Banner />
            <AiFeatured />
            <AiModels type={"avatar"} />
            <AiModels type={"style"} />
            <UsersCreation />
            <View style={{ height: 50 }}></View>
          </View>
        );
      }}
    ></FlatList>
  );
}

export default home;
