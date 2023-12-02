import React from 'react'
import {Ionicons} from '@expo/vector-icons';
import {View, Text, StyleSheet,TextInput} from 'react-native'
import { windowWidth } from '../utils/dimensions'
import { FormStyle } from '../utils/app-styles';

const FormInput = ({label, placeholder,title,lineNum, ...rest}) =>{
    const formStyle = FormStyle()
    return(
        <View style={formStyle.container}>
            {/* <Text style={formStyle.titleStyle}>
                {title}
            </Text> */}
            <TextInput
            style= {formStyle.inputField}
                value={label}
                numberOfLines={lineNum}
                placeholderTextColor='#666'
                placeholder={placeholder}
                multiline={true}
                {...rest}
            />
        </View>
    )
}

export default FormInput