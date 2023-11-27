import React,{useState, useEffect} from 'react'
import {View,Text,SafeAreaView, TouchableOpacity, ScrollView} from 'react-native'
import { windowWidth } from '../utils/dimensions'
import BottomSide from '../components/bottom-side'
import FormData from 'form-data'
import axios from 'axios'
import CredentialFormInput from '../components/credentialsFormComponent'
import { useTheme } from '../utils/state-context'
import { LoginStyle } from '../utils/app-styles'
import CircularProgressIndicator from '../components/progress-indicator'

const LoginScreen = ({navigation}) => {
    //initializing the styles
    const loginStyle = LoginStyle()
    //hooks for email and password
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    //set alert notification
    const [notification,setNotification] = useState('')
    //showing loader
    const [isProgress,setIsProgress] = useState(false)
    //progress setter
    const [progress, setProgress] = useState(0)

    //progress timer
    useEffect(() => {
        const interval = setInterval(() => {
        setProgress((prevProgress) => (prevProgress + 1) % 101)
        }, 30)
        return () => {
        clearInterval(interval)
        }
    }, [])

    //setting token
    const {setToken,setAuthor,setEmailAccess} = useTheme()
    const data = new FormData()

    //posts the request to the backend
    const LoginButton=async({password,email})=>{
        setIsProgress(true)
        data.append('email', email)
        data.append('password', password)
        await axios.post("https://yetublog.com/login/",data)
        .then((response)=>{
            setToken(response.data.token)
            setAuthor(response.data.username)
            setEmailAccess(response.data.email)
            navigation.navigate('Blogs')
        })
        .catch((err)=> {
            setIsProgress(false)
            if(err.response.status===401){
                setNotification('Wrong email or password')
            }else if(err.response.status===500){
                setNotification('There is a problem with the server')
            }else{
                setNotification('A problem Occurred, wait for fixing!')
            }
        })
    }
    return(
        <SafeAreaView>
            <View style ={loginStyle.container}>
                <ScrollView>
                    <View style={loginStyle.topContainer}>
                        <View style={{ width: windowWidth>800?100:windowWidth>400? 50: 20}}/>
                        <View style={loginStyle.boxContainer}>
                                <CredentialFormInput
                                    title={'Email:'}
                                    label={email}
                                    lineNum={1}
                                    placeholder={'Email Address'}
                                    keyboardType = 'email-address'
                                    onChangeText = {content => setEmail(content)}
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
                                        Press Login Button to gain Access
                                    </Text>:
                                    <Text style={loginStyle.textDesc}>
                                        {notification}
                                    </Text>
                                    }
                                    <TouchableOpacity
                                        onPress={()=>navigation.navigate('Register')}
                                    >
                                        <Text style={loginStyle.registerText}>Create an Account | Register</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    style={loginStyle.btn}
                                    onPress={()=>LoginButton({password,email})}
                                >
                                    <Text style={loginStyle.text} >Login</Text>
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
        </SafeAreaView>
    )
}

export default LoginScreen