import React from 'react';
import {Alert} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
//this is for save post 
class SavePost {
    constructor(){
        if(typeof SavePost.instance === 'object'){
            return SavePost.instance;
        }
        this.post = [];
      
        SavePost.instance = this;
       
    }
    // any set into the array
    async set(item){
        for(var i=0;i<this.post.length;i++){
            if(item.id===this.post[i].id){
                Alert.alert("This post remove!");
                this.post.splice(i,1);
                console.log("Found");
                await AsyncStorage.setItem("SavedPost", JSON.stringify(this.post));
                return;
            }
            console.log("i = ", i);
        }
            this.post.push(item);
            try{
                if(this.post.length!==0){
                    //try to save into local storage for next time to get
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
        if(items === null){
            return;
        }

        if(this.post.length === 0){
            try{
                for(var i=0; i<items.length; i++){
                    this.set(items[i]);
                }
            }catch(e){
                console.error(e);
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