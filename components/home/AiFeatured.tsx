import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import GlobalApi from "../../services/GlobalApi";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const AiFeatured = () => {
  const [aiModelList, setAiModelList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    GetAiFeaturedList();
  }, []);
  const GetAiFeaturedList = async () => {
    const result = await GlobalApi.GetFeaturedCategoryList();

    if (result.status === 200) {
      setAiModelList(result.data.data);
    }
  };
  const OnClickAiModel = (item: any) => {
    router?.push({
      pathname: "/formInput",
      params: item
    });
  };
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => OnClickAiModel(item)}
      style={{
        flex: 1,
        alignItems: "center"
      }}
    >
      <View
        style={{
          padding: 12,
          borderRadius: 8,
          backgroundColor: "#ccc",
          marginTop: 5
        }}
      >
        <Image
          source={{ uri: item?.icon?.url }}
          style={{
            width: 35,
            height: 35
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 10,
          textAlign: "center",
          color: Colors.PRIMARY,
          marginTop: 5
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  return (
    <View
      style={{
        margin: 20
      }}
    >
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold"
        }}
      >
        AiFeatured
      </Text>

      <FlatList
        data={aiModelList}
        keyExtractor={(item: any) => item.id}
        renderItem={renderItem}
        numColumns={4}
      />
      <View></View>
    </View>
  );
};

export default AiFeatured;
