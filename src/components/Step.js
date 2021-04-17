import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

// this is for step box call
// must have text and step props
const Step = (props) => {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.step}>
                    {props.text}
                </Text>
                <Text style={[styles.step,{color:"#FF6319",fontSize:42}]}>
                    {props.step}
                </Text>
                <Text style={styles.step}>
                    step
                </Text>
            </View>
        </>

    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        
    },
    step:{
        textTransform: 'uppercase',
        fontSize: 24,
        transform: [{translateY:80}],
        color: 'white',
        fontWeight: 'bold',
    }
});

export default Step;