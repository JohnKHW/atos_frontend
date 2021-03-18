import React from 'react';
import { 
    StyleSheet,
    Text,
    View,
    TouchableOpacity,Alert
} from 'react-native';

const tutorBox = (props) => {
    const boxText = props.text;
    return (
        <>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{boxText}</Text>
                <TouchableOpacity style={styles.btnContainer}>
                    <Text style={styles.btnText}>Next</Text> 
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    text:{
        fontSize:25,
        width: 250,
        textAlign: 'center'
    },
    textContainer: {
        backgroundColor: "rgba(255,255,255,0.7)",
        borderRadius:20,
        alignItems: 'center',
        padding:10,
        position: 'absolute',
    },
    btnContainer:{
        borderRadius:50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#309397",
        marginTop: 20,
        width: 100
    },
    btnText:{
        fontSize:25,
        color:"white",
    }
});

export default tutorBox;
