import React , {useState,useEffect}from 'react';
import {View, Text, Image,StyleSheet, TouchableOpacity,ScrollView,FlatList} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';

import {componentStyles} from 'src/common/containerStyles';
import SavePost from 'src/common/SavePost';
const SaveCollection = ({navigation}) => {
    const [data, setData] = useState(undefined);
    const testData = SavePost.get();
    const testArt = [{
        "id": 1,
        "title": "Demo Article",
        "content": "Demo Content",
    
        },
        {
        "id": 2,
        "title": "Demo Article2",
        "content": "Demo Content2",
    }];
    useEffect(() =>{
        setData(testData);
        console.log("getted data", testData);
    },[navigation])

    return (
     <>
        <HeaderIndex navigation={navigation}/>
        <View style={[componentStyles.container_v2,{alignItems: "center"}]}>
            <Image source={require("src/assets/images/icon_favour.png")}></Image>
            <Text style={styles.title}>Saved Article</Text>
            <ScrollView>
             
                {SavePost.get() === undefined?  <Text>No any saved</Text>:
                    <FlatList
                        data={data}
                        keyExtractor={({ id }) => id}
                        renderItem={({ item }) => (
                            <View style={styles.saveContainer}>
                                <Text style={styles.saveTitle}>{item.title}</Text>
                                <Text style={styles.saveContent}>{item.content}</Text>
                            </View>
                        )}
                    />
                }
            </ScrollView>
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
