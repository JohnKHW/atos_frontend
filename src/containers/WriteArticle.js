import React ,{useState,useEffect} from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
    Image, 
    Alert, 
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';
import {componentStyles} from 'src/common/containerStyles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {actions,customIcon,RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import { WebView } from 'react-native-webview';
import TutorBox from 'src/components/TutorBox';
// to write some article 
const WriteArticle = (props) => {
    // fields
    const [title,setTitle] = useState("");
    const [content, setContent] = useState("");
    const [hasNext, setHasNext] = useState(undefined);
    // fetching data and send
    const send = () => {
        fetch('http://42.2.228.35:8000/api/user/login', {
            method: 'POST',
            body:JSON.stringify({
              title: title,
              content: content,
              token: AsyncStorage.getItem("token"),
            })
          })
            .then((response) => {
              if(response.status===201){
                return response.json();
              }
            })

            .then((data) => {
               // Alert.alert(""+ JSON.stringify(data))
                console.log(JSON.stringify(data));
                props.navigation.navigate("Notification");
            })

            .catch((error) => {
                
                console.error(error);
                //navigation.navigate("Notification");
            });    

    }
/*
    const [richText,setRichText] = useState(React.createRef() || useRef());
    const onEditorInitialized = () => {
        richText.current?.registerToolbar(function (items) {
            // console.log('Toolbar click, selected items (insert end callback):', items);
        });
    }

    const handleChange = (html) => {
        setContent(html);
    }
    const [keyboardStatus, setKeyboardStatus] = useState(undefined);
    const onKeyShow = () => setKeyboardStatus("Keyboard Shown");
    const onKeyHide = () => setKeyboardStatus("Keyboard Hidden");
    */
    useEffect(() =>{
        const clearData = props.navigation.addListener('focus' , () => {

            setContent('');
        })

        return () => {
            clearData;
        }
    },[props.navigation]);

    useEffect(() =>{
        const clear = props.navigation.addListener('blur' , () => {
            props.navigation.setParams({
                helpCount:null,
                hasNext:null,
                countHelp:null})
        })
        return clear;
       
    },[props.navigation])

    useEffect(() =>{
        if(props.route.params){
           
            if(props.route.params.countHelp){
                
                setHasNext(parseInt(JSON.stringify(props.route.params.countHelp)))
            }else{
                setHasNext(0);
            }
            
        }
       
    })
    return (
        <>
        
         <View style={styles.header}>
            <Text style={styles.writeTitle}>Write Your Artile</Text>
        </View>
        <TouchableOpacity style={styles.backArrow} onPress={()=>props.navigation.goBack()}>
                    <Image source={require("src/assets/images/icon_back.png")}></Image>
        </TouchableOpacity>

        <TouchableOpacity style={styles.send}>
            <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={componentStyles.container_v2}>
           
           <View style={styles.titleContainer}>
                <TextInput
                    style={styles.inputTitle}
                    placeholder="Title"
                    autoCapitalize = "none"
                    onChangeText = {title => setTitle(title)}
                    value = {title}
                >
                </TextInput>       
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputContent}
                    placeholder="Content"
                    autoCapitalize = "none"
                    onChangeText = {content => setContent(content)}
                    value = {content}
                >
                </TextInput>       
            </View>
            {/*
                <View style={styles.inputContainer} keyboardDismissMode={'none'}>
                    <RichEditor
                        ref={(r) => setRichText(r)}
        
                        placeholder={'Content'}
                        style={styles.inputContent}
                        onChange={handleChange}
                        editorInitializedCallback={() => onEditorInitialized()}
                    />
                  
                    <Text>This is {content}</Text>
                </View>
               */} 
        </View>
            
        </TouchableWithoutFeedback>
        {hasNext===1&&
            <View style={{width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.7)",position:"absolute"}}></View>
         }
                {hasNext===1&&
                   
                    <TutorBox
                        mouseNum={1}
                        text={"You can write your article and send to us here."}
                        mouse1left={200}
                        mouse1top={200}
                        circle={0}
                        navigation={props.navigation}
                        isPlace={1}  
                        place ={"Transport"}
                        boxtop={100}
                        haveCount={0}
                        hasNext={1}
                        
                    />
                }
    </>

    )
}
const styles = StyleSheet.create({
    writeTitle: {
        fontSize:20,
        textAlign: "center",
        bottom:25
    },
    inputTitle: {
        fontSize:20,
        
    },
    header:{
        backgroundColor: "grey",
        paddingTop:80
    },
    backArrow:{
        position: "absolute",
        borderWidth:3,
        borderTopColor: 'black',
        marginTop:50,
        marginLeft:50,
        
    },
    titleContainer:{
        borderBottomWidth:1,
        padding:10,
    },
    inputContent:{
        fontSize:20,
    },
    inputContainer:{
        borderBottomWidth:1,
        height: '75%',
        padding:10,
        flex:1,
    },
    send:{
        position: "absolute",
        marginTop:50,
        marginLeft:50,
        borderWidth:3,
        borderColor: 'black',
        right:50,
        top:5
    },
    sendText:{
        fontSize:20,
    },

})

export default WriteArticle;