import { Feather, Ionicons,MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { windowWidth } from '../utils/dimensions'
import { TouchableOpacity } from 'react-native'
import * as Linking from 'expo-linking'
import { BottomSideStyle } from '../utils/app-styles'
import { useTheme } from '../utils/state-context'


const BottomSide= ({navigation}) => {
    const {darkTheme} = useTheme()
    const instagramLink = ()=>{
        Linking.openURL('https://bumho-nisubire.web.app')
    }
    const emailLink = () =>{
        Linking.openURL('mailto:youstory@gmail.com')
    }
    const linkWarning=()=>{
        alert('to be provided soon!')
    }
    const bottomSideStyle = BottomSideStyle()
    return(
        <View style={bottomSideStyle.container}>
            <View style={bottomSideStyle.connectWrapper}>
                <View style={{width: 200}}/>
                <View>
                    <View style={bottomSideStyle.titleWrapper}>
                        <Text style={bottomSideStyle.title}>Your Story</Text>
                    </View>
                </View>
                <View/>
                <Text style={bottomSideStyle.bottomTitle}>Social Media Handles:</Text>
                <View style={bottomSideStyle.bottomContent}>
                    <TouchableOpacity style={bottomSideStyle.linkWrapper} onPress={emailLink}>
                        <MaterialCommunityIcons name='gmail'size={30} color={darkTheme?'#ffffff':'#121212'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={bottomSideStyle.linkWrapper} onPress={instagramLink }>
                        <Ionicons name='logo-instagram'size={30} color={darkTheme?'#ffffff':'#121212'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={bottomSideStyle.linkWrapper}onPress={linkWarning }>
                        <Feather name='message-square'size={30} color={darkTheme?'#ffffff':'#121212'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={bottomSideStyle.linkWrapper}onPress={linkWarning }>
                        <Ionicons name='logo-whatsapp'size={30} color={darkTheme?'#ffffff':'#121212'}/>
                    </TouchableOpacity>
                </View>
                <View style={bottomSideStyle.bottomVerticalLine}></View>
                <View style={bottomSideStyle.bottomContent}>
                    <MaterialCommunityIcons name="copyright" size={24} color={darkTheme?'#ffffff':'#121212'} />
                    <Text style={bottomSideStyle.copyRight}> Bumho Nisubire </Text>
                    <TouchableOpacity style={bottomSideStyle.bottomLinkWrapper}>
                        <Text style={bottomSideStyle.bottomLinkText}>Help</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={bottomSideStyle.bottomLinkWrapper}>
                        <Text style={bottomSideStyle.bottomLinkText}>About YourStory</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={bottomSideStyle.bottomLinkWrapper}>
                        <Text style={bottomSideStyle.bottomLinkText}>Terms</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={bottomSideStyle.bottomLinkWrapper}>
                        <Text style={bottomSideStyle.bottomLinkText}>Privacy</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default BottomSide

