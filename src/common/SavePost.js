class SavePost {
    constructor(){
        if(typeof SavePost.instance === 'object'){
            return SavePost.instance;
        }
        this.post = [];
      
        SavePost.instance = this;
       
    }
    set(item){
        this.post.push(item);
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