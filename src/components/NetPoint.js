import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

const NetPoint = (props) => {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.earn}>
                    {props.text}
                </Text>
                <Text style={[styles.earn,{color:"#FF6319",fontSize:42}]}>
                    {props.netpoint}
                </Text>
                <Text style={styles.earn}>
                    net points
                </Text>
            </View>
        </>

    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        
    },
    earn:{
        textTransform: 'uppercase',
        fontSize: 24,
        transform: [{translateY:80}],
        color: 'white',
        fontWeight: 'bold',
    }
});

export default NetPoint;