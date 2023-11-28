import React,{useState,useContext,createContext,useEffect} from 'react'
import * as Font from 'expo-font'
// import { AsyncStorage } from 'react-native'


export const ThemeContext = createContext()

export const ColorThemeProvider = ({children})=>{
    const [roboFont,setRoboFont] = useState({
        'roboto-bold': null,
        'roboto-italic': null,
        'roboto-regular': null,
        'roboto-medium':null,
    })
    const [darkTheme,setDarkTheme] = useState(false)
    const [token,setToken] = useState('')
    const [author,setAuthor] = useState('')
    const [emailAccess,setEmailAccess] = useState('')
    const toggleTheme = () => {
        setDarkTheme(prevTheme => !prevTheme)
    }
    const [isFontsLoaded, setIsFontsLoaded] = useState(false)

    const fetchFonts = async () => {
        await Font.loadAsync({
            'roboto-bold': require('../../assets/fonts/Roboto-Bold.ttf'),
            'roboto-italic': require('../../assets/fonts/Roboto-Italic.ttf'),
            'roboto-regular': require('../../assets/fonts/Roboto-Regular.ttf'),
            'roboto-medium': require('../../assets/fonts/Roboto-Medium.ttf'),
        })
    }

    const loadFonts = async () => {
        try {
            await fetchFonts();
            setIsFontsLoaded(true)
            setRoboFont({
                'roboto-bold': require('../../assets/fonts/Roboto-Bold.ttf'),
                'roboto-italic': require('../../assets/fonts/Roboto-Italic.ttf'),
                'roboto-regular': require('../../assets/fonts/Roboto-Regular.ttf'),
                'roboto-medium': require('../../assets/fonts/Roboto-Medium.ttf'),
            })
        } catch (error) {
            console.error('Error loading fonts', error)
        }
    };
    const checkToken = async () => {
        try{
            if (typeof window !== 'undefined' && window.localStorage) {
                // We are in a web environment
                const storedToken = localStorage.getItem('userToken')
                const storedAuthor = localStorage.getItem('author')
                const storedEmail = localStorage.getItem('email')

                if (storedToken) {
                    setToken(storedToken)
                    setAuthor(storedAuthor)
                    setEmailAccess(storedEmail)
                }
            }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        loadFonts()
        checkToken()
      }, []); // Run only once when the component mounts

    if (!isFontsLoaded) {
        // Fonts are still loading, show AppLoading
        return null
    }

    return(
        <ThemeContext.Provider value={{
            darkTheme,setDarkTheme,
            toggleTheme,
            token,setToken,
            author,setAuthor,
            emailAccess,setEmailAccess,
            }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () =>{
    return useContext(ThemeContext)
}