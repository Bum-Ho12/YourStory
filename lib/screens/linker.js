import { NavigationContainer } from "@react-navigation/native"
import * as Linking from "expo-linking"

const linking = {
    prefixes: [
        'https://yourstory.co.ke/',
        'http://localhost:19006/',
        'http://127.0.0.1:8000/',
        // Linking.createURL("/")
    ],
    config: {
        screens: {
            Blogs: "/",
        //  ... other screens
        BlogRead: "blog/:id",
        Login: "login/",
        Register: "register/",
        Home: 'Home/',
        MyBlogs: 'MyBlogs/',
        NewPost: 'NewPost/',
        Preview: 'Preview/',
        },
    },
};

export default linking