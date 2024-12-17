import axios from "axios";

// 封装Replicate API请求的函数
const ReplicateApi = async (data: any) => {
  console.log(process.env.EXPO_PUBLIC_REPLICATE_API_KEY, 88);
  try {
    const response = await axios.post(
      "https://api.replicate.com/v1/predictions",
      {
        version:
          "5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
        input: {
          prompt: data?.inputPrompt // 动态设置prompt内容
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_REPLICATE_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log(response, response.status);
    if (response.status === 200 || response.status === 201) {
    }
    // 返回响应结果
    return response.data;
  } catch (error) {
    console.error("Error calling ab API:", error);
    throw error;
  }
};

export default ReplicateApi;
