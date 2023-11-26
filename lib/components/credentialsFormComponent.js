import React from 'react'
import {View, Text,TextInput} from 'react-native'
import { CredentialFormStyle } from '../utils/app-styles'

const CredentialFormInput = ({label, placeholder,title,lineNum, ...rest}) =>{
    //initializing styles
    const credentialFormStyle = CredentialFormStyle()
    return(
        <View style={credentialFormStyle.container}>
            <Text style={credentialFormStyle.titleStyle}>
                {title}
            </Text>
            <TextInput
            style= {credentialFormStyle.inputField}
                value={label}
                numberOfLines={lineNum}
                placeholderTextColor='#666'
                placeholder={placeholder}
                multiline={false}
                {...rest}
            />
        </View>
    )
}

export default CredentialFormInput