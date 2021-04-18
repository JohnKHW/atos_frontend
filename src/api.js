import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.1.101:8000",
});
