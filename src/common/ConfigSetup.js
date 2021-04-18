import axios from "axios";

//this page is for set up the api
class ConfigSetup {
  constructor() {
    if (typeof ConfigSetup.instance === "object") {
      return ConfigSetup.instance;
    }
    let api = "http://192.168.1.101:8000/";
    this.setAPI = (val) => (api = val);
    this.getAPI = () => api;
    ConfigSetup.instance = this;
  }
}
const config = new ConfigSetup();
Object.freeze(config);
export default config;
