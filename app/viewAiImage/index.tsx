import { useNavigation, useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, Image } from "react-native";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";

const ViewAiImage = () => {
  const params: any = useLocalSearchParams();
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const navigation = useNavigation();
  React.useEffect(() => {
    console.log(params);
    navigation.setOptions({
      headerShown: true,
      headerTitle: "view in image"
    });
  }, []);
  const downloadImage = async () => {
    //permission
    console.log(status, 1);
    try {
      if (!status?.granted) {
        const permissionResp = await requestPermission();
        if (!permissionResp?.granted) {
          Toast.show({
            type: "info", // 提示类型：success、error、info
            text1: "没有授权下载",
            position: "top", // Toast 显示位置：top、bottom、center
            visibilityTime: 2000 // 显示时间（毫秒）
          });
          return;
        }
      }
      if (FileSystem.documentDirectory) {
        const fileUri =
          FileSystem?.documentDirectory + Date.now() + "_ImaginAI.jpg";
        const { uri } = await FileSystem.downloadAsync(
          params?.imageUrl,
          fileUri
        );
        const asset = await MediaLibrary.createAssetAsync(uri);
        console.log(asset, 99);
        if (asset) {
          Toast.show({
            type: "success", // 提示类型：success、error、info
            text1: "图片下载！！！",
            position: "top", // Toast 显示位置：top、bottom、center
            visibilityTime: 4000 // 显示时间（毫秒）
          });
        } else {
          Toast.show({
            type: "error", // 提示类型：success、error、info
            text1: "图片下载失败！！！",
            position: "top", // Toast 显示位置：top、bottom、center
            visibilityTime: 4000 // 显示时间（毫秒）
          });
        }
      }
    } catch (error) {}
  };
  return (
    <View
      style={{
        padding: 20
      }}
    >
      <Image
        source={{ uri: params?.imageUrl }}
        style={{
          width: "100%",
          height: 400,
          borderRadius: 20
        }}
      />
      <Text
        style={{
          fontSize: 16,
          color: Colors.GRAY,
          marginVertical: 10
        }}
      >
        FROMPT:{params?.prompt}
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          marginTop: 50
        }}
      >
        <TouchableOpacity
          style={{
            padding: 15,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 10,
            width: "50%"
          }}
        >
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontSize: 18
            }}
          >
            Share
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={downloadImage}
          style={{
            padding: 15,
            backgroundColor: Colors.YELLOW,
            borderRadius: 10,
            width: "50%"
          }}
        >
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontSize: 18
            }}
          >
            Download
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          marginVertical: 10,
          fontSize: 16,
          color: Colors.GRAY
        }}
      >
        NOTE:Image will available only for next 30 Min
      </Text>
    </View>
  );
};

export default ViewAiImage;
