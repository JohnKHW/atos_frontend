import React from 'react';
import {Alert} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from 'react-native-reanimated';
class SavePost {
    constructor(){
        if(typeof SavePost.instance === 'object'){
            return SavePost.instance;
        }
        this.post = [];
      
        SavePost.instance = this;
       
    }
    async set(item){
        for(var i=0;i<this.post.length;i++){
            if(item.id===this.post[i].id){
                Alert.alert("This post remove!");
                this.post.splice(i,1);
                console.log("Found");
                return;
            }
            console.log("i = ", i);
        }
            this.post.push(item);
            try{
                if(this.post.length!==0){
                    await AsyncStorage.setItem("SavedPost", JSON.stringify(this.post));
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
        if(this.post.length === 0){
            for(var i=0; i<items.length; i++){
                this.set(items[i]);
            }

            console.log("in class, it added ", this.post);
        }
        else{
            console.log("in class, nothing happened");
        }
    }

    

    get(){
        return this.post;
    }

}
const savepost = new SavePost();
Object.freeze(savepost);
export default savepost;