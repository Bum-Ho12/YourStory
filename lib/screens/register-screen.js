import React,{useState, useEffect} from 'react'
import {View,Text, TouchableOpacity, ScrollView} from 'react-native'
import { windowWidth } from '../utils/dimensions'
import BottomSide from '../components/bottom-side'
import FormData from 'form-data'
import axios from 'axios'
import CredentialFormInput from '../components/credentialsFormComponent'
import { useTheme } from '../utils/state-context'
import { LoginStyle } from '../utils/app-styles'
import CircularProgressIndicator from '../components/progress-indicator'
import { baseUrl } from '../utils/urls'

const RegisterScreen = ({navigation}) => {
    //initializing the styles
    const loginStyle = LoginStyle()
    //hooks for email and password
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const[username, setUsername] = useState('')
    const [description, setDescription] = useState('New User')

    //set alert notification
    const [notification,setNotification] = useState('')
    //showing loader
    const [isProgress,setIsProgress] = useState(false)
    //progress setter
    const [progress, setProgress] = useState(0)
    // useTheme
    const {setToken, setAuthor, setEmailAccess} = useTheme()

    //progress timer
    useEffect(() => {
        const interval = setInterval(() => {
        setProgress((prevProgress) => (prevProgress + 1) % 101)
        }, 30)
        return () => {
        clearInterval(interval)
        }
    }, [])

    const data = new FormData()

    //posts the request to the backend
    const RegisterButton=async({password,email})=>{
        setIsProgress(true)
        data.append('email', email)
        data.append('username',username)
        data.append('description',description)
        data.append('password', password)
        await axios.post(`${baseUrl}register_user/`,data)
        .then((response)=>{
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.setItem('userToken', response.data.token)
                localStorage.setItem('author', response.data.username)
                localStorage.setItem('email', response.data.email)
                setToken(response.data.token)
                setAuthor(response.data.username)
                setEmailAccess(response.data.email)
                // Reload the entire web app
                try{
                    window.location.reload()
                }finally{
                    navigation.goBack()
                }
            }

        })
        .catch((err)=> {
            setIsProgress(false)
            if(err.response.status===501){
                setNotification('Failed to Register User')
            }else if(err.response.status===500){
                setNotification('There is a problem with the server')
            }else{
                setNotification(JSON.stringify(err.response.data))
            }
        })
    }
    return(
            <View style ={loginStyle.container}>
                <ScrollView>
                    <View style={loginStyle.topContainer}>
                        <View style={{ width: windowWidth>800?100:windowWidth>400? 50: 20}}/>
                        <View style={loginStyle.boxContainer}>
                                <CredentialFormInput
                                    title={'User Name:'}
                                    label={username}
                                    lineNum={1}
                                    placeholder={'Username'}
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
                                <CredentialFormInput
                                    title={'Description:'}
                                    label={description}
                                    lineNum={1}
                                    placeholder={description}
                                    onChangeText = {content => setDescription(content)}
                                />
                                <CredentialFormInput
                                    title={'Password:'}
                                    label={password}
                                    lineNum={1}
                                    secureTextEntry = {true}
                                    placeholder={'A-Z,a-z,0-9,{!@#}'}
                                    onChangeText = {content => setPassword(content)}
                                />
                                <View>
                                    {isProgress?
                                    <CircularProgressIndicator
                                        radius={25}
                                        strokeWidth={10}
                                        progress={progress}
                                    />:notification===''?
                                    <Text style={loginStyle.textDesc}>
                                        Press Register Button to create an Account
                                    </Text>:
                                    <Text style={loginStyle.textDesc}>
                                        {notification}
                                    </Text>
                                    }
                                </View>
                                <TouchableOpacity
                                    style={loginStyle.btn}
                                    onPress={()=>RegisterButton({password,email})}
                                >
                                    <Text style={loginStyle.text} >Register</Text>
                                </TouchableOpacity>
                        </View>
                        <View style={loginStyle.textContainer}>
                            <Text style={loginStyle.textDesc}>
                                To have access to the website,
                            </Text>
                            <Text style={loginStyle.textDesc}>
                                Input your credentials.
                            </Text>
                        </View>
                    </View>
                    <BottomSide/>
                </ScrollView>
            </View>
    )
}

export default RegisterScreen