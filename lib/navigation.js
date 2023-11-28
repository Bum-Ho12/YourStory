import React, {useEffect} from 'react'
import {NavigationContainer,useNavigation,DefaultTheme, DarkTheme} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Home from './screens/home'
import Blogs from './screens/blogs'
import Subscription from './screens/subscription'
import NavigationBar from './components/navigation-bar'
import BlogRead from './screens/blog-read'
import linking from './screens/linker'
import { useTheme } from './utils/state-context'
import LoginScreen from './screens/login'
import NewPostMultiple from './screens/create-post'
import NewPostPreview from './screens/blog-preview'
import RegisterScreen from './screens/register-screen'
import MyBlogs from './screens/author-blogs'


const Stack = createStackNavigator()

function AllStacks(){
    const navigation = useNavigation()
    return(
        <Stack.Navigator
        screenOptions={{
            headerShown: true,
            header:()=>{
                return(
                    <NavigationBar
                    navigation={navigation}
                    />
                )
            },
        }}
        >
            <Stack.Screen name='Blogs' component={Blogs} />
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='Subscription' component={Subscription} />
            <Stack.Screen name='Register' component={RegisterScreen} />
            <Stack.Screen name='Login' component={LoginScreen}/>
            <Stack.Screen name='NewPost' component={NewPostMultiple}/>
            <Stack.Screen name='Preview' component={NewPostPreview}/>
            <Stack.Screen name='BlogRead' component={BlogRead} />
            <Stack.Screen name='MyBlogs' component={MyBlogs}/>

        </Stack.Navigator>
    )
}

export default function Navigation({colorScheme}){
    const {setDarkTheme} = useTheme()
    useEffect(()=>colorScheme === 'dark' ? setDarkTheme(false) : setDarkTheme(false))
    return(
        <NavigationContainer
        linking={linking}
        >
            <AllStacks/>
        </NavigationContainer>
    )
}
