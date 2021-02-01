import React , {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';
import {componentStyles} from 'src/common/containerStyles';


const Notification = ({navigation}) => { 

    const [response,setResponse] =  useState("no worry we will fix it!");
    const [response2,setResponse2] =  useState("We will update you with your situation through email");

    return (
        <>
            <HeaderIndex/>
            <View style={[componentStyles.container_v2,{alignItems:"center"}]}>
        
                <Text>Notification</Text>
                    <View style = {styles.noticeContainer}>
                        <Image source={require("src/assets/images/icon_report.png")}></Image>
                        <View style={styles.noticeTextContainer}> 
                            <Text style={styles.reportsent}>Report Send</Text>
                            <Text style={styles.reportsent}>{response}</Text>
                            
                        </View>
                        <View style={styles.responseContainer}>
                             <Text style={styles.response}>{response2}</Text>
                        </View>
                    </View>
               
                
            </View>
            <FooterIndex style={styles.footer} navigation={navigation}/>
        </>
    )
};

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 84,
    },
    reportsent:{
        fontSize: 24,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color:"#FF6319",
        marginVertical:5
    },
    noticeContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 150
    },
    noticeTextContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:20
    },
    response:{
        color:'white',
        textAlign: 'center'
    },
    responseContainer:{
        width: '70%',
    }
})

export default Notification;