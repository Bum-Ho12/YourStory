import React from 'react'
import {View,Text} from 'react-native'
import { TopicStyle } from '../utils/app-styles'
import { windowWidth } from '../utils/dimensions'

function TopicButton({topic}){
    const topicStyle =  TopicStyle()
    const lengthAdd = windowWidth>800? 20: 5
    const buttonWidth = (topic.length * 8) + lengthAdd
    return(
        <View style={[topicStyle.extendedBtn, {width: buttonWidth}]} >
            <Text style={topicStyle.extendText} >{topic}</Text>
        </View>
    )
}

export default TopicButton