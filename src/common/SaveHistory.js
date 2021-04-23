import React from 'react';
import {Alert} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
class SaveHistory {
    constructor(){
        if(typeof SaveHistory.instance === 'object'){
            return SaveHistory.instance;
        }
        this.history = [];
    
        SaveHistory.instance = this;
    
    }
    // any set into the array
    async set(item){
            this.history.push(item);
            try{
                if(this.history.length!==0){
                    //try to save into local storage for next time to get
                    await AsyncStorage.setItem("History", JSON.stringify(this.history));
                    console.log(
                        "Saved history in class",
                        JSON.parse(await AsyncStorage.getItem("History"))
                      );
                }      
            }catch(e){
                console.error(e);
            }
    }

    setArray(items){
        for(var i=0; i<items.length; i++){
        
            this.set(items[i]);
        }
    }
    setSave(items){
        if(items === null){
            return;
        }

        if(this.history.length === 0){
            try{
                for(var i=0; i<items.length; i++){
                    this.set(items[i]);
                }
            }catch(e){
                console.error(e);
            }
            console.log("in class, it added ", this.history);
        }
        else{
            console.log("in class, nothing happened");
        }
    }



    get(){
        return this.history;
    }

}
const saveHistory = new SaveHistory();
Object.freeze(saveHistory);
export default saveHistory;