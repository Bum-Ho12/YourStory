import React from 'react'
import {View,Text} from 'react-native'
import { TopicStyle } from '../utils/app-styles'

function TopicButton({topic}){
    const topicStyle =  TopicStyle()
    return(
        <View style={topicStyle.extendedBtn} >
            <Text style={topicStyle.extendText} >{topic}</Text>
        </View>
    )
}

export default TopicButton