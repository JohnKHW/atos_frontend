import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import NetPoint from 'src/components/NetPoint'
import {componentStyles} from 'src/common/containerStyles';
import HeaderIndex from 'src/common/HeaderIndex';
import FooterIndex from 'src/common/FooterIndex';
const Congrats = ({navigation}) => {
    return (
        <>
            <HeaderIndex/>
            <View style = {[componentStyles.container_v2,{alignItems: "center"}]}>
                <Text style={{fontSize:40,textTransform: 'uppercase',transform:[{translateY:50}],color:"#FF6319", fontWeight:"bold", marginTop:50,marginBottom:50}}>Conratulations!!</Text>
                <NetPoint netpoint="00000" text="you have earned"/>
                <TouchableOpacity style={styles.btn} onPress={()=>navigation.goBack()}>
                    <Text style={styles.btnText}>Start Again</Text>
                </TouchableOpacity>
            </View>
            <FooterIndex style={styles.footer} navigation={navigation}/>
            
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
    btn:{
        borderWidth:1,
        borderRadius:50,
        padding:5,
        width:150,
        transform : [{translateY:150}],
        backgroundColor:"#309397"
    },
    btnText:{
        fontSize: 26,
        textAlign:"center",
        color:"white"
    }
})

export default Congrats;