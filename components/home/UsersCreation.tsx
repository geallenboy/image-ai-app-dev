import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { useRouter } from "expo-router";

import GlobalApi from "../../services/GlobalApi";
import Colors from "../../constants/Colors";

const UsersCreation = () => {
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [aiImageList, setAiImageList] = useState<any>([]);
  const router = useRouter();

  const Columnwidth = (Dimensions.get("screen").width * 0.86) / 2;
  useEffect(() => {
    setAiImageList([]);
    GetAllAiImages(pageSize);
  }, []);
  const GetAllAiImages = async (size: number) => {
    setLoading(true);
    // setAiImageList([]);
    const result = await GlobalApi.GetAllAiImages(size);
    console.log("all image1：", result);
    const resultData = result.data.data;
    // setAiImageList(resultData);
    resultData?.forEach((element: any) => {
      setAiImageList((prev: any) => [...prev, element]);
    });
    setLoading(false);
  };
  const onImageClick = (item: any) => {
    router?.push({
      pathname: "/viewAiImage",
      params: {
        imageUrl: item.imageUrl
      }
    });
  };
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => onImageClick(item)}
      style={{
        margin: 5
      }}
    >
      <Image
        source={{ uri: item?.imageUrl }}
        style={{
          width: Columnwidth,
          height: 250,
          borderRadius: 15
        }}
      />
    </TouchableOpacity>
  );

  const RenderFoot = () => {
    if (loading) {
      return <ActivityIndicator size={"large"} color={Colors.PRIMARY} />;
    }
    return null;
  };

  return (
    <View style={{}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginVertical: 10
        }}
      >
        UsersCreation
      </Text>
      <FlatList
        onEndReached={() => GetAllAiImages(pageSize + 5)}
        onEndReachedThreshold={0.7}
        data={aiImageList}
        numColumns={2}
        ListFooterComponent={RenderFoot}
        renderItem={renderItem}
      />
    </View>
  );
};

export default UsersCreation;
