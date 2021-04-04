import React from 'react';
import {Alert} from 'react-native';

class SavePost {
    constructor(){
        if(typeof SavePost.instance === 'object'){
            return SavePost.instance;
        }
        this.post = [];
      
        SavePost.instance = this;
       
    }
    set(item){
        for(var i=0;i<this.post.length;i++){
            if(item.id===this.post[i].id){
                Alert.alert("This post added!");
                console.log("Found");
                return;
            }
            console.log("i = ", i);
        }
            this.post.push(item);
            console.log("fail out");
    }

    setArray(items){
        for(var i=0; i<items.length; i++){
          
            this.set(items[i]);
        }
    }

    get(){
        return this.post;
    }

}
const savepost = new SavePost();
Object.freeze(savepost);
export default savepost;