import React , {useState,useEffect}from 'react';
import {View, Text, Image,StyleSheet,FlatList,Alert} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';

import {componentStyles} from 'src/common/containerStyles';
import SavePost from 'src/common/SavePost';
const SaveCollection = ({navigation}) => {
    const [data, setData] = useState({});
    const [currentTime, setTime] = useState(0);

    var mytime;
    useEffect(() =>{
        const reRun = navigation.addListener('focus' , () => {
             
            setTime(Date.now().toString());
            
            console.log("focus");
        });
        mytime = setTimeout(() => {
            setTime(Date.now().toString());
            //Alert.alert("Time " + currentTime);
        }, 3000);
       

        const unsubscribe = navigation.addListener('blur' , () => {
            clearTimeout(mytime);
            console.log("I done clear")
        })
        return () => {
            unsubscribe;
            reRun;
        }
    })

    useEffect(() =>{
        
        const reRun = navigation.addListener('focus' , () => {
            setData(SavePost.get());
        });

    
        return () =>{
            reRun;
            
        }
        //console.log("getted data", testData);
    },[navigation]);
  
    return (
     <>
        <HeaderIndex navigation={navigation}/>
        <View style={[componentStyles.container_v2,{alignItems: "center"}]}>
            <Image source={require("src/assets/images/icon_favour.png")}></Image>
            <Text style={styles.title}>Save Article</Text>
                    
                    <FlatList
                        
                        data={data}
                        extraData={currentTime}
                        keyExtractor={({ id }) => id.toString()}
                        renderItem={({ item }) => (
                            data === null? <Text>No any save post</Text>:
                            <View style={styles.saveContainer}>
                                <Text style={styles.saveTitle}>{item.title}</Text>
                                <Text style={styles.saveContent}>{item.content}</Text>
                            </View>
                        )}
                    />
                        
                
           
        </View>
    <FooterIndex style={styles.footer} navigation={navigation}/>
    </>
  );
};

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 84,
    },
    title: {
        fontSize:25,
        color:'#FF6319'
    },
    saveContainer: {
        backgroundColor: "rgba(255, 255, 255,0.3)",
        borderColor:"white",
        borderWidth:2,
        borderRadius:30,
        height:115,
        marginTop: 20,
        width:298,
    },
    saveTitle:{
        textAlign: 'center',
        fontSize:24,
        marginTop:10,
        color: '#FF6319',
        fontWeight: 'bold'
    },
    saveContent:{
        marginHorizontal : 30,
        marginVertical : 10,
    },
});
export default SaveCollection;
