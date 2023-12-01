import React,{useState} from 'react'
import {View,Text,SafeAreaView, TouchableOpacity, ScrollView} from 'react-native'
import { windowWidth,windowHeight } from '../utils/dimensions'
import FormInput from '../components/formInput'
import BottomSide from '../components/bottom-side'
import FormData from 'form-data'
import axios from 'axios'
import { SubscriptionStyle } from '../utils/app-styles'
import { Spacer } from 'react-native-flex-layout'
import { useTheme } from '../utils/state-context'
import CredentialFormInput from '../components/credentialsFormComponent'
import { baseUrl } from '../utils/urls'

const Subscription = ({navigation}) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const data = new FormData()
    const {darkTheme} = useTheme()

    const subscriptionStyle = SubscriptionStyle()
    //posts the request to the backend
    const SubButton=async({username,email})=>{
        data.append('email', email)
        data.append('name', username)
        await axios.post(`${baseUrl}register/`,data)
        .then((response)=>{
            alert(`${username} Subscribed Successfully!`)
        })
        .catch((err)=> alert(err))
    }

    return(
        <SafeAreaView style=
        {{
            // width:windowWidth,
            height: windowHeight,
            backgroundColor:darkTheme?'#121212':'#ffffff'
        }}>
            <View
            style ={subscriptionStyle.topContainer}
            >
                <ScrollView>
                    <View
                    style={subscriptionStyle.container}
                    >
                        <View style={subscriptionStyle.boxContainer}>
                            <CredentialFormInput
                                    title={'Username:'}
                                    label={username}
                                    lineNum={1}
                                    placeholder={'Full name'}
                                    onChangeText = {content => setUsername(content)}
                                />
                                    <CredentialFormInput
                                        title={'Email:'}
                                        label={email}
                                        lineNum={1}
                                        placeholder={'Email Address'}
                                        keyboardType = 'email-address'
                                        onChangeText = {content => setEmail(content)}
                                    />
                                    <TouchableOpacity
                                        style={subscriptionStyle.btn}
                                        onPress={()=>SubButton({username,email})}
                                    >
                                        <Text style={subscriptionStyle.text} >Subscribe</Text>
                                    </TouchableOpacity>
                        </View>
                        <View style={subscriptionStyle.textContainer}>
                                <Text style={subscriptionStyle.textDesc}>
                                    Subscribe to our blog website
                                </Text>
                                <Text style={subscriptionStyle.textDesc}>
                                    to stay up-to-date with our constant, never-ending,
                                </Text>
                                <Text style={subscriptionStyle.textDesc}>
                                    Dungeon Discoveries.
                                </Text>
                        </View>
                    </View>
                    {/* <Spacer/> */}
                    <BottomSide/>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Subscription


