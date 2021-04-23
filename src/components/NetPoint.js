import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

// this is for given others to render the netpoint box
// must have the netpoint and text props
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
        transform: [{translateY:50}],
        color: 'white',
        fontWeight: 'bold',
    }
});

export default NetPoint;