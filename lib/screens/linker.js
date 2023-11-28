import { NavigationContainer } from "@react-navigation/native"
import * as Linking from "expo-linking"

const linking = {
    prefixes: [
        'https://yetublog.com/',
        'http://localhost:19006/',
        // Linking.createURL("/")
    ],
    config: {
        screens: {
            Blogs: "/",
        //  ... other screens
        BlogRead: "blog/:id",
        Login: "login/",
        Register: "register/",
        },
    },
};

export default linking