import React ,{useState}from 'react';
import {View, Text} from 'react-native';

const SettingComponents = (props) => {

    return (
        <>
            <TouchableOpacity>
                <Text>Change Icon</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Change Name</Text>
            </TouchableOpacity>
        </>
    )

}


export default SettingComponents;