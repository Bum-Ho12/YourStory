import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { Spacer } from 'react-native-flex-layout'
import { windowWidth } from '../utils/dimensions'
import { NavigationBarStyle } from '../utils/app-styles'
import { useTheme } from '../utils/state-context'

const DropdownMenu = ({ options }) => {
    const navBarStyle = NavigationBarStyle()
    return (
        <View style={navBarStyle.dropdownMenu}>
            {options.map((option,index) => (
            <View key={index}>
                <TouchableOpacity style={navBarStyle.dropdownMenuItem} onPress={option.onPress}>
                <Text style={navBarStyle.dropdownMenuItemText}>{option.label}</Text>
                </TouchableOpacity>
                {index < options.length - 1 && <View style={navBarStyle.divider} />}
            </View>
            ))}
        </View>
    )
}

const NavigationBar = ({ navigation }) => {
    const navBarStyle = NavigationBarStyle()
    const { token } = useTheme()
    const route = useRoute()

    const [btnTextWidth, setBtnTextWidth] = useState(0)

    const onTextLayout = (e) => {
        setBtnTextWidth(e.nativeEvent.layout.width)
    }
    const [showDropdown, setShowDropdown] = useState(false)

    const handleLogout = () => {
        if (typeof window !== 'undefined' && window.localStorage) {
            // Clear local storage
            localStorage.removeItem('userToken')
            localStorage.removeItem('author')
            localStorage.removeItem('email')

            // Reload the entire web app
            window.location.reload()
            navigation.replace('/')
        }
    }

    const dropdownOptions = [
        { label: 'Profile', onPress: () => navigation.navigate('Profile') },
        { label: 'Post Story', onPress: () => navigation.navigate('NewPost')},
        { label: 'My Stories', onPress: () => navigation.navigate('MyBlogs') },
        { label: 'Logout', onPress: handleLogout },
    ]

    const isActive = (routeName) => route.name === routeName

    return (
        <View style={navBarStyle.wrapper}>
        <View style={navBarStyle.titleWrapper}>
            <Text style={navBarStyle.title}>Your Story</Text>
        </View>
        {windowWidth > 400 ? (
            <View style={{ width: 50 }} />
        ) : (
            <View style={{ height: 20 }} />
        )}
        <View style={navBarStyle.btnWrapper}>
            <TouchableOpacity
                style={navBarStyle.btn}
                onPress={() => navigation.navigate('Blogs')}
                >
                <Text
                    style={[navBarStyle.btnText, isActive('Blogs') && navBarStyle.activeBtnText]}
                    onLayout={onTextLayout}
                >
                    Home
                </Text>
                {isActive('Blogs') && (
                    <View
                    style={[navBarStyle.activeBtnLine, { width: isActive('Blogs') ? btnTextWidth : 0 }]}
                    />
                )}
                </TouchableOpacity>
            <TouchableOpacity
            style={navBarStyle.btn}
            onPress={() => navigation.navigate('Home')}
            >
            <Text
                style={[navBarStyle.btnText, isActive('Home') && navBarStyle.activeBtnText]}
                onLayout={onTextLayout}
            >
                Stories
            </Text>
            {isActive('Home') && (
                <View
                style={[navBarStyle.activeBtnLine, { width: isActive('Home') ? btnTextWidth : 0 }]}
                />
            )}
            </TouchableOpacity>
            {windowWidth>600 &&
            <TouchableOpacity
            style={navBarStyle.btn}
            onPress={() => navigation.navigate('Subscription')}
            >
            <Text
                style={[navBarStyle.btnText, isActive('Subscription') && navBarStyle.activeBtnText]}
                onLayout={onTextLayout}
            >
                Subscription
            </Text>
            {isActive('Subscription') && (
                <View
                style={[navBarStyle.activeBtnLine, { width: isActive('Subscription') ? btnTextWidth : 0 }]}
                />
            )}
            </TouchableOpacity>
            }
                {
                    token?
                    <TouchableOpacity
                        style={navBarStyle.btn}
                        onPress={() => setShowDropdown(!showDropdown)}
                    >
                        <Text style={navBarStyle.btnText}>Account</Text>
                        {showDropdown && <DropdownMenu options={dropdownOptions} />}
                    </TouchableOpacity>
                    :<TouchableOpacity
                        style={navBarStyle.btnLogin}
                        onPress={()=>navigation.navigate('Login')}
                    >
                        <Text style={navBarStyle.textLogin} >Login</Text>
                    </TouchableOpacity>
                }
        </View>
        </View>
    )
};

export default NavigationBar
