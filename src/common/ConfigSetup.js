class ConfigSetup {
    constructor(){
        if(typeof ConfigSetup.instance === 'object'){
            return ConfigSetup.instance;
        }
        let api = "168.70.24.187:8000/";
        this.setAPI = (val) => api = val;
        this.getAPI = () => api;
        ConfigSetup.instance = this;
       
    }
    
   

}
const config = new ConfigSetup();
Object.freeze(config);
export default config;