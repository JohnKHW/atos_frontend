import React , {useState,useEffect}from 'react';
import {View, Text, Image,StyleSheet,FlatList,Alert} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';

import {componentStyles} from 'src/common/containerStyles';
import SavePost from 'src/common/SavePost';
const SaveCollection = ({navigation}) => {
    const [data, setData] = useState({});
    const [isFetching, setIsFetching] = useState(false);
    const [testName, setTestName] = useState("Save Article");

    useEffect(() =>{
        
        const reRun = navigation.addListener('focus' , () => {
            setData(SavePost.get());
           
            Alert.alert(" " + JSON.stringify(data));
        });
        return reRun;
        //console.log("getted data", testData);
    },[navigation]);
    
    return (
     <>
        <HeaderIndex navigation={navigation}/>
        <View style={[componentStyles.container_v2,{alignItems: "center"}]}>
            <Image source={require("src/assets/images/icon_favour.png")}></Image>
            <Text style={styles.title}>{testName}</Text>
                    
                    <FlatList
                        
                        data={data}
                        extraData={data.length}
                        keyExtractor={({ id }) => id.toString()}
                        renderItem={({ item }) => (
                            data === undefined? <Text>No any save post</Text>:
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
