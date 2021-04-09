import React ,{useEffect, useState}from 'react';
import {View, Text, Image,StyleSheet, ScrollView} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';
import {componentStyles} from 'src/common/containerStyles';
const ArticleDetail = (props) => {
    const [title,setTitle] =  useState(props.route.params.title);
    const [content,setContent] = useState(props.route.params.content);
    const [author, setAuthor] = useState(props.route.params.author);
    console.log("passed title ", props.route.params.title);
    console.log("passed content ", props.route.params.content);

    useEffect(() =>{
            setTitle(props.route.params.title);
            setContent(props.route.params.content);
            setAuthor(props.route.params.author);
            console.log("focus")
            console.log("now title ", title);
            console.log("now content ", content);
        
    })

    useEffect(() =>{
        const unsubscribe = props.navigation.addListener('blur' , ()=>{
            setTitle("");
            setContent("");
            setAuthor("");
        })
        return () => {
            unsubscribe;
        }
    },[props.navigation]);

    return (
        <>
            <HeaderIndex navigation={navigation} backgroundColor={"#FFC650"}/>
                <View  style={[componentStyles.container_v2,{alignItems: "center"}]}> 
                     <Text style={styles.title}>{title}</Text>
                     <View style={styles.authorContainer}>
                        <Text style={{fontWeight:'bold',fontSize:20}}>Author: </Text>
                        <Text style={{fontSize:20}}>{author}</Text>
                    </View>
                    <ScrollView 
                        bounces ={false}
                        style={styles.contentContainer}
                    >
                        <Text style={styles.content}>{content}</Text>
                    </ScrollView>
                </View>
            <FooterIndex style={styles.footer} navigation={props.navigation}/>
        </>
    )

}

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 84,
      },
    title:{
        fontWeight:'bold',
        fontSize: 30,
        textAlign: 'center'
    },
    content:{
        fontSize:25
    },
    contentContainer:{
        padding:5
    },
    authorContainer:{
        flexDirection: 'row',
        padding:10,
    }
})

export default ArticleDetail;