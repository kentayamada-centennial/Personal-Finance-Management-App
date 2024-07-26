import axios from "axios";

import { Platform } from "react-native";

const getBaseURL = () => {
  const url =
    Platform.OS === "web"
      ? process.env.EXPO_PUBLIC_API_URL_WEB
      : process.env.EXPO_PUBLIC_API_URL_MOBILE;
  console.log("Base URL:", url);
  return url;
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
});

export default axiosInstance;
