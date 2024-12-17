import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image } from "react-native";
import GlobalApi from "../../services/GlobalApi";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

const AiModels = ({ type }: any) => {
  const [aiModelList, setAiModelList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    GetAiModels();
  }, []);
  const GetAiModels = async () => {
    const result = await GlobalApi.GetAiModels(type);
    if (result.status === 200) {
      console.log(result.data.data);

      setAiModelList(result?.data?.data);
    }
  };
  const OnClickModel = (item: any) => {
    router?.push({
      pathname: "/formInput",
      params: item
    });
  };
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => OnClickModel(item)}
      style={{
        marginRight: 15
      }}
    >
      <Image
        source={{ uri: item?.banner?.url }}
        style={{
          width: 140,
          height: 180,
          borderRadius: 15
        }}
      />
      <Text
        style={{
          position: "absolute",
          bottom: 10,
          color: Colors.WHITE,
          width: "100%",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 15
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "black",
          marginTop: 20,
          marginBottom: 10
        }}
      >
        {type?.toUpperCase()}
      </Text>
      <FlatList
        data={aiModelList}
        horizontal={true}
        keyExtractor={(item: any) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AiModels;
