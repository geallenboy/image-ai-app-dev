import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://192.168.3.9:1337/api",
  headers: {
    Authorization: "Bearer " + process.env.EXPO_PUBLIC_STRAPI_API_KEY
  }
});

const GetUserInfo = (email: string) =>
  axiosClient.get("user-lists?filters[userEmail][$eq]=" + email);

const CreateNewUser = (data: any) => axiosClient.post("/user-lists", { data: data });

const GetFeaturedCategoryList = () =>
  axiosClient.get("/ai-models?filters[isFeatured][$eq]=true&populate=*");

const GetAiModels = (type: string) =>
  axiosClient.get(`/ai-models?filters[${type}][$eq]=true&populate=*`);

const AIGenerateImage = async (data: any) =>
  axios.post("http://192.168.3.9:8081/aimodel", data);

const UpdateUserCredits = (documentId: string, data: any) =>
  axiosClient.put("user-lists/" + documentId, { data: data });

const AddAiImageRecord = (data: any) =>
  axiosClient.post("/ai-generated-images", { data: data });

const GetAllAiImages = (pageSize: number) =>
  axiosClient.get(
    "/ai-generated-images?pagination[start]=" +
    (pageSize - 5) +
    "&pagination[limit]=10"
  );

export default {
  GetUserInfo,
  CreateNewUser,
  GetFeaturedCategoryList,
  GetAiModels,
  AIGenerateImage,
  UpdateUserCredits,
  AddAiImageRecord,
  GetAllAiImages
};
