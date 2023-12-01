import { StyleSheet } from "react-native"
import { windowHeight, windowWidth } from "./dimensions"
import { useTheme } from "./state-context"


export const SafeAreaViewStyle = ()=>{
    const {darkTheme} = useTheme()
    const styles = StyleSheet.create({
        container:{backgroundColor: darkTheme?'#121212':'#ffffff',}
    })
    return styles
}

export const ProgressIndicatorStyle = ()=>{
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
        },
    })
    return styles
}

export const CredentialFormStyle= ()=>{
    const {roboFont,darkTheme} = useTheme()
    const styles = StyleSheet.create({
        container: {
            alignItems: 'flex-start',
            marginTop:5,
            marginBottom: 5,
            width: 300,
            borderColor: 'transparent',
            borderRadius: 10,
            borderWidth: 1,
            flexDirection: 'column',
            backgroundColor: darkTheme?'#121212':'#ffffff',
        },
        titleStyle:{
            padding: 10,
            fontSize: 18,
            fontFamily:'roboto-bold',
            fontWeight: 'bold',
            justifyContent: 'center',
            alignItems: 'center',
            // borderRightColor: '#ccc',
            // borderRightWidth: 1,
            width: 150,
            color: darkTheme?'#F6FAF8':'#121212',
        },
        text: {
            padding: 10,
            flex: 1,
            fontSize: 16,
            justifyContent: 'center',
            alignItems: 'center',
            color: darkTheme?'#F6FAF8':'#121212',
            fontFamily:'roboto-medium',
        },
        inputField: {
            padding: 10,
            marginTop: 5,
            marginBottom: 5,
            width: 290,
            fontSize: 16,
            borderRadius: 8,
            borderWidth: 0,
            backgroundColor:darkTheme?'#F0F0F0':'rgba(0, 0, 0, 0.1)',
            fontFamily:'roboto-medium',
        }
    })
    return styles
}

export const NavigationBarStyle =()=>{
    const {roboFont,darkTheme} = useTheme()
    const styles = StyleSheet.create({
        wrapper: {
            flexDirection: windowWidth>600?'row':'column',
            alignContent:'center',
            alignItems: 'center',
            paddingHorizontal: windowWidth>400?50:10,
            paddingVertical: 10,
            backgroundColor: darkTheme?'#121212':'#ffffff',
            color: '#35547b',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',

        },
        titleWrapper: {
            flexWrap: true,
        },
        btnWrapper:{
            flexDirection:'row'
        },
        btn:{
            paddingHorizontal:windowWidth>600?10:5,
            paddingVertical: windowWidth>600?5: 3,
            // color: '#35547b',
            // backgroundColor:'#35547b',
            backgroundColor: darkTheme?'#121212':'#ffffff',
            margin: windowWidth>400?7:5,
            borderRadius: 20,
            alignItems: 'center',
            // width: windowWidth>400?130:100,
        },
        btnLogin:{
            // marginTop: windowWidth>400 ?10:5,
            borderRadius: 20,
            backgroundColor:'#63bde1',
            paddingHorizontal:windowWidth>400?20:10,
            paddingVertical: windowWidth>400?5: 3,
            alignItems: 'center',
            justifyContent: 'center',
            height: 40,
        },
        dropdownMenu: {
            position: 'absolute',
            top: 40,
            right: 0,
            backgroundColor: '#fff',
            zIndex: 1,
            borderWidth: 1,
            borderColor: '#ccc',
            width: 150,
        },
        dropdownMenuItem: {
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
        },
        dropdownMenuItemText: {
            color: '#63bde1',
            fontWeight:'200',
            fontFamily: 'roboto-regular',
            fontSize: 16
        },
        divider:{
            borderBottomWidth: 2,
            borderBottomColor: '#A1CADA',
        },
        activeBtnLine: {
            borderBottomWidth: 2,
            borderBottomColor: darkTheme ? '#ffffff' : '#121212',
            marginTop: 2,
            borderRadius: 5,
        },
        title:{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#63bde1',
            fontFamily: 'roboto-bold'
        },
        btnText:{
            fontSize: 18,
            fontWeight: '400',
            color: '#7DA9BB',
        },
        activeBtnText:{
            fontSize: 20,
            fontWeight: '600',
            color: darkTheme?'#ffffff':'#121212',
        },
        textLogin:{
            fontFamily: 'roboto-regular',
            color: '#ffffff',
            fontSize: 20,
            fontWeight:'400'
        },
    })
    return styles
}


export const LoginStyle= ()=>{
    const {roboFont,darkTheme} = useTheme()
    const styles = StyleSheet.create({
        topContainer:{
            alignItems:'center',
            alignContent: 'space-around',
            backgroundColor: darkTheme?'rgba(0, 0, 0, 0.9)': '#F6FAF8',
            // width: windowWidth* 0.8
        },
        container:{
            alignContent: 'center',
            // flex: 1,
            alignItems: 'center',
            // width: windowWidth,
            paddingHorizontal: 10,
        },
        boxContainer:{
            borderRadius: 20,
            // height: 320,
            color: '#fff',
            backgroundColor:darkTheme?'#121212':'#fff',
            padding: 5,
            marginBottom: 10,
            marginTop: 5,
            alignItems: 'center',
        },
        textContainer:{
            alignItems: 'center',
            alignContent: 'center',
            padding: 10,
            borderRadius: 20,
            height: 100,
            color: darkTheme?'#121212':'#fff',
            backgroundColor:darkTheme?'#121212':'#fff',
            marginBottom: 6,
            marginTop: 5,
        },
        titleWrapper: {
            flexWrap: true,
        },
        title:{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#63bde1',
            fontFamily: 'roboto-bold'
        },
        btn:{
            color: '#fff',
            marginTop: windowWidth>600 ?10:5,
            borderRadius: 20,
            backgroundColor:'#63bde1',
            padding: 10,
            alignItems: 'center',
            width: 100,
        },
        textDesc:{
            fontSize: 14,
            fontStyle: 'italic',
            fontFamily:'roboto-italic',
            marginTop: 10,
            color: darkTheme?'#ffffff':'#121212',
        },
        text: {
            fontWeight: 'bold',
            fontSize: 16,
            justifyContent: 'center',
            alignItems: 'center',
            color: darkTheme?'#ffffff':'#121212',
            fontFamily:'roboto-regular',
        },
        registerText:{
            fontFamily: 'roboto-italic',
            fontSize: 16,
            justifyContent: 'center',
            color: '#63bde1',
            fontWeight: '400'
        }
    })
    return styles
}


// handles home styling
export const HomeStyle  = ()=>{
    const {roboFont,darkTheme} = useTheme()
    const styles = StyleSheet.create({
        container:{
            flex:1,
            alignItems:'center',
            backgroundColor: darkTheme?'#121212':'#ffffff',
            // paddingLeft: 15,
            // paddingRight:15,
        },
        trendingWrapper:{
            flexDirection:'column',
            padding: 10,
            alignItems: 'space-between',
            alignContent: 'space-around',
            width: windowWidth>1000? 900: windowWidth>800?windowWidth*0.95:windowWidth,
        },
        latestText:{
            fontSize:windowWidth>800? 24:20,
            color:'#63bde1',
            fontWeight:'bold',
            fontFamily:'roboto-regular',
            margin: 15,
        },
        trendingText:{
            fontSize:windowWidth>800? 20:14,
            color:'#63bde1',
            fontWeight:'bold',
            fontFamily:'roboto-bold',
            margin: 15,
        },
        dateTimeWrapper:{
            flexDirection: 'row',
            padding:10
        },
        timeText:{
            fontSize: windowWidth>800? 14:12,
            fontWeight: 'bold',
            color: darkTheme?'#ffffff':'#121212',
            marginRight: 10,
            fontFamily: 'roboto-italic'
        },
        dateText:{
            fontSize: windowWidth>800? 14:12,
            fontWeight: 'bold',
            color: darkTheme?'#ffffff':'#121212',
            fontFamily: 'roboto-italic'
        },
        btnWrapper:{
            padding: 10,
            margin: 10,
            alignItems: 'center',
            justifyContent: 'center'
        },
        btn:{
            padding: 10,
            color: '#E1EFF5',
            backgroundColor:'#E1EFF5',
            margin: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center'
        },
        title:{
            fontSize: 20,
            fontWeight:'bold',
            color:'#63bde1',
            fontFamily: 'roboto-bold'
        },
        contentTitle:{
            fontSize: 14,
            fontWeight: 'bold',
        },
        contentTxt:{
            fontSize: 13,
            color: '#63bde1',
            fontWeight: 'bold',
        },
        trendingTitle:{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#63bde1',
            padding: 10,
            fontFamily: 'roboto-regular'
        },
        preText:{
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: 'roboto-medium'
        },
        btnText:{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#63bde1',
            fontFamily: 'roboto-regular'
        }
    })
    return styles
}

export const BlogsStyle =()=> {
    const {roboFont,darkTheme} = useTheme()
    const  styles = StyleSheet.create({
        starter:{
            // flex:1,
            // height: 400
        },
        backgroundImage:{
            // flex:1,
            resizeMode: 'contain',
            justifyContent:'center',
            height: 400
        },
        overlay: {
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
        },
        container:{
            flex:1,
            alignItems:'center',
            backgroundColor: darkTheme?'#121212':'#ffffff',
            paddingLeft: 15,
            paddingRight:15,
        },
        topicsWrapper:{
            padding: 10,
            alignItems: 'space-between',
            alignContent: 'space-around',
            width: windowWidth>800?windowWidth*0.3:windowWidth*0.8,
        },
        trendingWrapper:{
            // flex:2,
            flexDirection:'column',
            padding: 10,
            alignItems: 'space-between',
            alignContent: 'space-around',
            width: windowWidth>800?windowWidth*0.5:windowWidth,
        },
        btn:{
            color: '#fff',
            marginTop: windowWidth>400 ?20:10,
            borderRadius: 20,
            backgroundColor:'#63bde1',
            padding: 10,
            alignItems: 'center',
            // width: 100,
        },
        text: {
            fontWeight: 'bold',
            fontSize: 16,
            justifyContent: 'center',
            alignItems: 'center',
            color: '#ffffff',
            fontFamily: 'roboto-regular'
        },
        trendingText:{
            fontSize:24,
            color:'##121212',
            fontWeight:'bold',
            fontFamily: 'roboto-bold',
            margin: 15,
        },
        titleText:{
            fontFamily: 'roboto-bold',
            fontSize: windowWidth> 600?36: 30,
            color: '#ffffff',
            flexWrap: true,
            width: windowWidth *0.4
        },
        preText:{
            fontFamily: 'roboto-italic',
            fontSize: windowWidth> 600?25: 20,
            color: '#ffffff',
            width: windowWidth *0.4
            // justifyContent: 'center'
        },
    })
    return styles
}

export const SubscriptionStyle = ()=>{
    const {darkTheme} = useTheme()
    const styles = StyleSheet.create({
        topContainer:{
            // alignItems:'center',
            // alignContent: 'center',
            backgroundColor: darkTheme?'rgba(0, 0, 0, 0.9)': '#F6FAF8',
            // width: windowWidth,
        },
        container:{
            alignContent: 'center',
            // flex: 1,
            alignItems: 'center',
            backgroundColor: darkTheme?'#121212': '#fff',
        },
        boxContainer:{
            borderRadius: 10,
            height: 320,
            color: '#fff',
            backgroundColor:darkTheme?'rgba(0, 0, 0, 0.9)':'#F6FAF8',
            padding: 5,
            marginBottom: 10,
            marginTop: 5,
            alignItems: 'center',
        },
        textContainer:{
            alignItems: 'center',
            alignContent: 'center',
            padding: 10,
            borderRadius: 20,
            height: windowWidth> 800? 150: 100,
            color: darkTheme?'#121212':'#fff',
            backgroundColor:darkTheme?'#121212':'#fff',
            marginBottom: 6,
            marginTop: 5,
        },
        titleWrapper: {
            flexWrap: true,
        },
        title:{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#63bde1',
            fontFamily: 'roboto-regular'
        },
        btn:{
            color: '#fff',
            marginTop: windowWidth>600 ?10:5,
            borderRadius: 20,
            backgroundColor:'#63bde1',
            padding: 10,
            alignItems: 'center',
            width: 100,
        },
        textDesc:{
            fontSize: 14,
            fontStyle: 'italic',
            fontFamily: 'roboto-italic',
            marginTop: 10,
            color: darkTheme?'#ffffff':'#121212',
        },
        text: {
            fontWeight: 'bold',
            fontSize: 16,
            justifyContent: 'center',
            alignItems: 'center',
            color: darkTheme?'#ffffff':'#121212',
            fontFamily: 'roboto-regular'
        },
    })

    return styles
}


export const FormStyle= ()=>{
    const {darkTheme} = useTheme()
    const styles = StyleSheet.create({
        container: {
            alignItems: 'flex-start',
            marginTop:5,
            marginBottom: 5,
            width: windowWidth*0.5,
            borderColor: 'transparent',
            borderRadius: 10,
            borderWidth: 1,
            flexDirection: 'column',
            backgroundColor: darkTheme?'#121212':'#fff'
        },
        titleStyle:{
            padding: 10,
            fontSize: 18,
            fontWeight: 'bold',
            justifyContent: 'center',
            alignItems: 'center',
            width: windowWidth*0.45,
            color: darkTheme?'#F6FAF8':'#121212',
        },
        text: {
            padding: 10,
            flex: 1,
            fontSize: 16,
            fontFamily: 'roboto-regular',
            justifyContent: 'center',
            alignItems: 'center',
            color: darkTheme?'#ffffff':'#121212',
        },
        inputField: {
            padding: 10,
            marginTop: 5,
            marginBottom: 5,
            width: windowWidth> 600?windowWidth*0.45: windowWidth*0.5,
            fontSize: 16,
            borderRadius: 8,
            borderWidth: 0,
            backgroundColor: darkTheme?'#F0F0F0':'#ffffff',
            fontFamily: 'roboto-medium'
        }
    })

    return styles
}

export const ListCardStyle =()=>{
    const {darkTheme} = useTheme()
    const styles = StyleSheet.create({
        container:{
            // flex: 1,
            flexDirection: 'row',
            marginHorizontal: 10,
            marginVertical: 10,
            alignContent: 'flex-start',
            alignItems: 'center',
            justifyContent:'flex-start',
            width: windowWidth>800? windowWidth*0.45: windowWidth*0.9,
        },
        img:{
            height: windowWidth>800?130: 120,
            width: windowWidth>800? 200: 150,
            // borderRadius: 10,
        },
        txt:{
            fontSize: windowWidth>800?20:18,
            fontWeight: 'bold',
            fontFamily: 'roboto-medium',
            color:darkTheme?'#ffffff':'#242424',
            width: windowWidth>800? windowWidth*0.3: windowWidth*0.5,
            padding: 5,
            marginBottom: 10,
            marginTop: 5
        },
        btn:{
            color: '#E1EFF5',
            backgroundColor:'#E1EFF5',
            margin: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
        },
        btnText:{
            fontSize: windowWidth>800?16:14,
            fontWeight: 'bold',
            fontFamily: 'roboto-medium',
            color:'#121212',
            padding: 5,
            margin: 5,
        },
        authorText:{
            color: darkTheme?'#ffffff':'#242424',
            fontSize: windowWidth>800? 16: 14,
            fontWeight: 'bold',
            fontFamily: 'roboto-regular',
            width: windowWidth>800?windowWidth*0.3: windowWidth*0.5,
        },
        contentText:{
            color: darkTheme?'#ffffff':'#242424',
            fontSize: windowWidth>800? 16: 14,
            fontWeight: '200',
            fontFamily: 'roboto-regular',
            width: windowWidth>800?windowWidth*0.3: windowWidth*0.5,
        },
    })
    return styles
}

export const BlogCardStyle =()=>{
    const {darkTheme} = useTheme()
    const styles = StyleSheet.create({
        container:{
            flex: 1,
            // padding: 5,
            marginHorizontal: 10,
            marginVertical: 5,
            alignContent: 'flex-start',
            alignItems: 'center',
            justifyContent:'flex-start',
            width: windowWidth>800? 300: 150,
        },
        img:{
            height: windowWidth>800? 150: 120,
            width: windowWidth>800? 280: 145,
            // borderRadius: 10,
        },
        txt:{
            fontSize: windowWidth>800?18:16,
            fontWeight: 'bold',
            fontFamily: 'roboto-medium',
            color:darkTheme?'#ffffff':'#242424',
            width: windowWidth>800? 280: 145,
            padding: 5,
            marginBottom: 10,
            marginTop: 5
        },
        btn:{
            color: '#E1EFF5',
            backgroundColor:'#E1EFF5',
            margin: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
        },
        btnText:{
            fontSize: windowWidth>800?16:14,
            fontWeight: 'bold',
            fontFamily: 'roboto-medium',
            color:'#121212',
            padding: 5,
            margin: 5,
        },
        authorText:{
            color: darkTheme?'#ffffff':'#242424',
            fontSize: windowWidth>800? 14: 12,
            fontWeight: 'bold',
            fontFamily: 'roboto-bold',
            width: windowWidth>800?280: 145,
        },
        contentText:{
            color: darkTheme?'#ffffff':'#242424',
            fontSize: windowWidth>800? 14: 12,
            fontWeight: '200',
            fontFamily: 'roboto-regular',
            width: windowWidth>800?280: 145,
        },
    })
    return styles
}

export const BlogContentStyle = ()=>{
    const {darkTheme} = useTheme()
    const styles = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor: darkTheme?'#121212':'#ffffff',
            width: windowWidth>600 ?windowWidth*0.7: windowWidth*0.8,
        },
        upperWrapper:{
            flexDirection: 'column',
            padding: windowWidth> 600?10: 2,
            justifyContent: 'center',
            alignContent: 'flex-start',
            flexWrap: 'wrap',
        },
        lowerWrapper:{
            flexWrap: 'wrap',
            paddingHorizontal: windowWidth> 600?10: 2,
            alignContent: 'center',
            alignItems: 'center',
            width:windowWidth> 600? windowWidth*0.5: windowWidth*0.8,
        },
        actionWrapper:{
            flexDirection: 'column',
            alignItems:'center',
            justifyContent: 'center',
            marginHorizontal: windowWidth> 600?5:1,
            marginTop:100,
            paddingHorizontal: 2,
            width: windowWidth>600?100: 50,
            borderRadius: 10,
            borderBlockColor: darkTheme?'#ffffff': '#6F6F6F',
            height: windowWidth>800?300: 250,
            borderWidth: 1.5,
        },
        bioWrapper:{
            flexDirection:windowWidth>800? 'column':'row',
            flexWrap: 'wrap' ,
            padding:windowWidth>800?5: 1,
            justifyContent: windowWidth>800?'center': 'flex-start',
            alignItems:'flex-start',
            width: windowWidth>800? 250: windowWidth*0.6,
            height: windowWidth>800?200: undefined,
        },
        imgWrapper:{
            margin:5,
            padding: 5,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        dateTimeWrapper:{
            flexDirection: 'row',
        },
        imgContentWrapper:{
            flexDirection: 'column',
            alignContent: 'center',
            alignItems: 'center',
        },
        img:{
            width: windowWidth>800?600: windowWidth> 600? 300: windowWidth*0.8,
            height: windowWidth>800?300: 200,
            borderRadius: 10,
            marginVertical: 10,
        },
        contentImg:{
            width: windowWidth>800?700: windowWidth> 600? 300: windowWidth*0.8,
            height: windowWidth>800?300: 200,
            borderRadius: 10,
            marginVertical: 10,
        },
        imgCopyrightText:{
            fontSize: 10,
            fontStyle: 'italic',
            fontFamily: 'roboto-italic',
            color: darkTheme?'#ffffff':'#121212',
        },
        title:{
            fontSize: windowWidth> 600? 32: 28,
            fontWeight: 'bold',
            color: darkTheme?'#ffffff':'#121212',
            flexWrap: 'wrap',
            fontFamily: 'roboto-italic'
        },
        timeText:{
            fontSize: windowWidth>800? 14:12,
            fontWeight: 'bold',
            color: darkTheme?'#ffffff':'#121212',
            marginRight: 10,
            fontFamily: 'roboto-italic'
        },
        dateText:{
            fontSize: windowWidth>800? 14:12,
            fontWeight: 'bold',
            color: darkTheme?'#ffffff':'#121212',
            fontFamily: 'roboto-italic'
        },
        editorText:{
            fontSize: windowWidth>800? 18: 16,
            fontStyle: 'italic',
            color: darkTheme?'#ffffff':'#121212',
            fontFamily: 'roboto-bold'
        },
        contentText:{
            color: darkTheme?'#ffffff':'#242424',
            fontSize: windowWidth>800? 16: 14,
            fontWeight: '400',
            fontFamily: 'roboto-regular'
        },
        extendedBtn:{
            alignItems: 'center',
            alignContent:'center',
            backgroundColor: darkTheme?'#121212':'#ffffff',
            paddingVertical: 10,
        },
        extendText:{
            color: '#63bde1',
            fontSize: windowWidth> 600?18: 16,
            fontWeight: 'bold',
            fontFamily: 'roboto-italic'
            // width: 90,
        },
        loadText:{
            fontSize:windowWidth>800? 16:13,
            color:'#63bde1',
            fontWeight:'bold',
            margin: 15,
        },
    })

    return styles
}


export const BlogReadStyle = ()=>{
    const {darkTheme} = useTheme()
    const styles = StyleSheet.create({
        container:{
            flex:1,
            alignItems:'center',
            backgroundColor: darkTheme?'#121212':'#ffffff',
            paddingLeft: 15,
            paddingRight:15,
        },
        trendingWrapper:{
            flexDirection:'column',
            padding: 10,
            alignItems: 'space-between',
            alignContent: 'space-around',
            width: windowWidth>1000? 900: windowWidth>800?700:350,
        },
        trendingText:{
            fontSize:windowWidth>800? 20:14,
            color:'#63bde1',
            fontWeight:'bold',
            margin: 15,
        },
        story:{
            color: darkTheme?'#ffffff':'#242424',
            fontSize: windowWidth>800? 16: 14,
            fontWeight: '400',
            fontFamily: 'source-serif-pro, Georgia, Cambria, "Times New Roman", Times,'
        },
        extendedBtn:{
            alignItems: 'center',
            alignContent:'center',
            backgroundColor: darkTheme?'#121212':'#ffffff',
            paddingVertical: 10,
            paddingHorizontal: 10,
            flexDirection:'row',
            marginVertical: 10,
            borderWidth: 0.6,
            borderRadius: 20,
            borderColor: darkTheme?'#ffffff':'#242424',
        },
        extendText:{
            color: darkTheme?'#ffffff':'#242424',
            fontSize: windowWidth> 600?18: 16,
            fontWeight: 'bold',
            fontFamily: 'roboto-italic',
            marginRight: 5
            // width: 90,
        },
    })

    return styles
}

export const TopicStyle = ()=>{
    const {roboFont,darkTheme} = useTheme()
    const styles = StyleSheet.create({
        extendedBtn:{
            alignItems: 'center',
            alignContent:'center',
            backgroundColor: darkTheme?'#121212':'#ffffff',
            paddingVertical: 10,
            paddingHorizontal: 10,
            flexDirection:'row',
            marginVertical: 10,
            borderWidth: 0.6,
            borderRadius: 20,
            borderColor: darkTheme?'#ffffff':'#242424',
        },
        extendText:{
            color: darkTheme?'#ffffff':'#242424',
            fontSize: windowWidth> 600?18: 16,
            fontWeight: 'bold',
            fontFamily: 'roboto-italic',
            marginRight: 5
            // width: 90,
        },
    })
    return styles
}

export const  BottomSideStyle = ()=>{
    const {darkTheme} = useTheme()
    const styles = StyleSheet.create({
        container:{
            backgroundColor: darkTheme?'rgba(0, 0, 0, 0.8)': '#C9E3EE',
            padding: 10,
            paddingBottom: 20,
            width: windowWidth,
            alignItems: 'center',
            justifyContent: 'center'
        },
        titleWrapper:{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems:'center',
            margin: 10
        },
        connectWrapper:{
            flexDirection: 'column',
            alignContent:'center',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            width: windowWidth,
        },
        linkWrapper:{
            flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: windowWidth>600?20:5,
        },
        bottomContent:{
            alignItems: 'center',
            flexDirection: 'row'
        },
        bottomLinkWrapper:{
            marginHorizontal: windowWidth>800?20:10,
            marginVertical: 5,
        },
        bottomVerticalLine:{
            backgroundColor:darkTheme?'#ffffff':'#a0a0a0',
            width: windowWidth*90/100,
            height: 1,
        },
        title:{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#63bde1',
            marginBottom: 10
        },
        titleSec:{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#63bde1',
        },
        copyRight:{
            color: darkTheme?'#ffffff':'#121212',
            fontSize: 14,
        },
        bottomTitle:{
            fontSize: 13,
            color: darkTheme?'#ffffff':'#121212',
            fontWeight: 'bold'
        },
        bottomLinkText:{
            fontSize: windowWidth>800? 14:12,
            fontWeight: 'bold',
            color: darkTheme?'#ffffff':'#121212',
        },
        linkText:{
            fontSize:11,
            color: '#63bde1',
            marginLeft: 5
        },
    })
    return styles
}

export const CreatePostStyle= ()=>{
    const {roboFont,darkTheme} = useTheme()
    const styles = StyleSheet.create({
        container:{
            flexDirection: 'row',
            backgroundColor: darkTheme?'#121212':'#ffffff',
            width: windowWidth,
        },
        contentWrapper:{
            alignContent: 'center',
            alignItems: 'center',
            padding: 10,
        },
        otherWrapper:{
            alignContent: 'center',
            alignItems: 'center'
        },
        btn:{
            padding: 10,
            color: '#D6E7DE',
            backgroundColor:'#D6E7DE',
            margin: 10,
            borderRadius: 10,
        },
        btnText:{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#63bde1',
            fontFamily: 'roboto-regular'
        },
        uploadButton: {
            backgroundColor: '#63bde1',
            color: 'white',
            padding: 10,
            borderRadius: 5,
            cursor: 'pointer',
        },
        input: {
            display: 'none',
        },
    })
    return styles
}

export const NewMultipleStyle= ()=>{
    const {roboFont,darkTheme} = useTheme()
    const styles = StyleSheet.create({
        container:{
            flexDirection: windowWidth> 600?'row': 'column',
            backgroundColor: darkTheme?'#121212':'#ffffff',
            width: windowWidth,
        },
        contentWrapper:{
            alignContent: 'center',
            alignItems: 'center',
            padding: 10,
        },
        otherWrapper:{
            alignContent: 'center',
            alignItems: 'center'
        },
        btn:{
            padding: 10,
            color: '#D6E7DE',
            backgroundColor:'#D6E7DE',
            margin: 10,
            borderRadius: 10,
        },
        btnText:{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#63bde1',
            fontFamily: 'roboto-regular'
        },
        uploadButton: {
            backgroundColor: '#63bde1',
            color: 'white',
            padding: 10,
            borderRadius: 5,
            cursor: 'pointer',
        },
        input: {
            display: 'none',
        },
    })
    return styles
}

export const BlogPreviewStyle= ()=>{
    const {roboFont,darkTheme} = useTheme()
    const styles = StyleSheet.create({
        container:{
            flexDirection: 'row',
            backgroundColor: darkTheme?'#121212':'#ffffff',
            width: windowWidth,
        },
        contentWrapper:{
            alignContent: 'center',
            alignItems: 'center',
            padding: 10,
        },
        otherWrapper:{
            alignContent: 'center',
            alignItems: 'center'
        },
        btn:{
            padding: 10,
            color: '#D6E7DE',
            backgroundColor:'#D6E7DE',
            margin: 10,
            borderRadius: 10,
        },
        btnText:{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#63bde1',
            fontFamily: 'roboto-regular'
        }
    })
    return styles
}

export const BlogContentPreviewStyle= ()=>{
    const {roboFont,darkTheme} = useTheme()
    const styles = StyleSheet.create({
        container:{
            flex:1,
            backgroundColor:darkTheme?'#121212':'#ffffff',
            width: windowWidth*2/3,
            paddingBottom: 10
        },
        upperWrapper:{
            flexDirection: windowWidth>800?'row': 'column',
            padding: 10,
            justifyContent: 'center',
            alignContent: 'center',
            flexWrap: 'wrap'
        },
        lowerWrapper:{
            flexWrap: 'wrap',
            paddingHorizontal: 10,
            alignContent: 'center',
            alignItems: 'center',
        },
        bioWrapper:{
            flexDirection:'column',
            padding:5,
            justifyContent: 'flex-start',
            alignItems:'flex-start'
        },
        imgWrapper:{
            margin:5,
            padding: 5,
            flexDirection: 'column',
            alignContent: windowWidth>800?'flex-end': 'center',
            alignItems: windowWidth>800?'flex-end': 'center',
        },
        dateTimeWrapper:{
            flexDirection: 'row',
        },
        img:{
            width: windowWidth>800?400: 200,
            height: windowWidth>800?300: 150,
        },
        imgCopyrightText:{
            fontSize: 10,
            fontStyle: 'italic',
            color: darkTheme?'#ffffff':'#242424',
            fontFamily: 'roboto-italic'
        },
        title:{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#63bde1',
            flexWrap: 'wrap',
            fontFamily: 'roboto-bold'
        },
        timeText:{
            fontSize: windowWidth>800? 14:12,
            fontWeight: 'bold',
            color: darkTheme?'#ffffff':'#242424',
            marginRight: 10,
            fontFamily: 'roboto-medium'
        },
        dateText:{
            fontSize: windowWidth>800? 14:12,
            fontWeight: 'bold',
            color: darkTheme?'#ffffff':'#242424',
            fontFamily: 'roboto-medium'
        },
        editorText:{
            fontSize: windowWidth>800? 12: 11,
            fontStyle: 'italic',
            color: darkTheme?'#ffffff':'#242424',
            fontFamily: 'roboto-regular'
        },
        contentText:{
            color: darkTheme?'#ffffff':'#242424',
            fontSize: windowWidth>800? 16: 14,
            fontWeight: '400',
            fontFamily: 'source-serif-pro, Georgia, Cambria, "Times New Roman", Times,',
            fontFamily: 'roboto-medium'
        },
        extendedBtn:{
            width: 90,
        },
        extendText:{
            color: '#63bde1',
            fontSize: 14,
            fontWeight: 'bold',
            width: 90,
            fontFamily:'roboto-medium'
        }
    })
    return styles
}
