import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default axios.create({
  baseURL: "http://168.70.3.116:8000",
});
