import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Colors from "../../constants/Colors";
import MyTextInput from "../../components/formInput/MyTextInput";
import ImageUpload from "../../components/formInput/ImageUpload";
import { TouchableOpacity } from "react-native";
import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native";
import Toast from "react-native-toast-message";
import { UserDetailContext } from "../../context/UserDetailContext";
import GlobalApi from "../../services/GlobalApi";

const FormInput = () => {
  const params: any = useLocalSearchParams();
  const navigation = useNavigation();
  const router = useRouter();
  const [aiModel, setAiModel] = useState<any>(null);
  const [useInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [generatedImage, setGeneratedImage] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  useEffect(() => {
    console.log("params:", params);
    setAiModel(params);
    navigation.setOptions({
      headerShown: true,
      headerTitle: params?.name
    });
  }, []);
  const textToImage = async () => {
    const data = {
      aiModelName: aiModel?.aiModelName,
      inputPrompt: useInput,
      defaultPrompt: aiModel?.defaultPrompt
    };
    try {
      setLoading(true);
      const result = await GlobalApi.AIGenerateImage(data);
      const AIImagePath = result.data.data;
      console.log(AIImagePath, "AIImagePath");
      //to update User credits
      updateUserCredits();
      //save generated image URL
      UploadImageAndSave(AIImagePath);
    } catch (error) {
      setLoading(false);
    }
  };
  const updateUserCredits = async () => {
    const updateResult = await GlobalApi.UpdateUserCredits(
      userDetail?.documentId,
      {
        credits: Number(userDetail?.credits) - 1
      }
    );
    setUserDetail(updateResult.data.data);
  };
  const UploadImageAndSave = async (AIImagePath: any) => {
    const cld = new Cloudinary({
      cloud: {
        cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_NAME
      },
      url: {
        secure: true
      }
    });
    const options = {
      upload_preset: process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      unsigned: true
    };
    await upload(cld, {
      file: AIImagePath,
      options: options,
      callback: async (error, response) => {
        console.log(response);
        const newUrl = response?.url;
        //save generated image URL
        const SaveImageResult = await GlobalApi.AddAiImageRecord({
          imageUrl: newUrl,
          userEmail: userDetail?.userEmail
        });
        setLoading(false);
        router.push({
          pathname: "/viewAiImage",
          params: {
            prompt: useInput,
            imageUrl: newUrl
          }
        });
      }
    });
  };
  const ImageToImage = async () => {
    setLoading(true);
    const cld = new Cloudinary({
      cloud: {
        cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_NAME
      },
      url: {
        secure: true
      }
    });
    const options = {
      upload_preset: process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      unsigned: true
    };

    await upload(cld, {
      file: userImage,
      options: options,
      callback: async (error, response) => {
        console.log(response);
        const data = {
          defaultPrompt: aiModel?.defaultPrompt,
          userImageUrl: response?.url,
          aiModelName: aiModel?.aiModelName
        };
        const result = await GlobalApi.AIGenerateImage(data);
        console.log(result.data.data);
        updateUserCredits();

        setLoading(false);
        router.push({
          pathname: "/viewAiImage",
          params: {
            prompt: aiModel?.name,
            imageUrl: result.data.data
          }
        });
      }
    });
  };

  const OnGenerate = async () => {
    console.log(aiModel?.userImageUpload, 1);
    if (userDetail?.credits <= 0) {
      Toast.show({
        type: "info", // 提示类型：success、error、info
        text1: "没有足够多的积分了", // 主消息文本
        position: "top", // Toast 显示位置：top、bottom、center
        visibilityTime: 2000 // 显示时间（毫秒）
      });
      return;
    }
    if (aiModel?.userImageUpload) {
      ImageToImage();
    } else {
      textToImage();
    }
  };
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: Colors.WHITE,
        height: "100%"
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold"
        }}
      >
        {aiModel?.name}
      </Text>
      <View>
        {aiModel?.userImageUpload ? (
          <ImageUpload uploadedImage={(value: any) => setUserImage(value)} />
        ) : (
          <MyTextInput useInputValue={(value: any) => setUserInput(value)} />
        )}
        <Text style={{ marginTop: 10, color: Colors.GRAY }}>
          NOTE:1 Credit will use to generate AI Image
        </Text>
        <TouchableOpacity
          onPress={() => OnGenerate()}
          disabled={loading}
          style={{
            padding: 12,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 15,
            marginVertical: 15,
            width: "100%",
            marginTop: 30
          }}
        >
          {loading ? (
            <ActivityIndicator size={"large"} color={"#fff"} />
          ) : (
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: 20
              }}
            >
              Generate
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormInput;
