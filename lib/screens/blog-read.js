import React,{useEffect,useState, useRef} from 'react'
import {View,SafeAreaView,FlatList,Text,TouchableOpacity,
    ScrollView} from 'react-native'
import Blog from '../components/blog-content'
import BottomSide from '../components/bottom-side'
import axios from 'axios'
import { Feather } from '@expo/vector-icons'
import { windowHeight,windowWidth } from '../utils/dimensions'
import { BlogReadStyle } from '../utils/app-styles'
import { Spacer } from 'react-native-flex-layout'
import { useTheme } from '../utils/state-context'
import { baseUrl } from '../utils/urls'
import BlogTrendCard from '../components/blog-trend-card'


const BlogRead = ({route,navigation}) => {
    const [blog, setBlog] = useState([])
    const [owner, setOwner] = useState()
    const [data, setData] = useState([])
    const scrollViewRef = useRef(null)
    const {darkTheme} = useTheme()

    const blogReadStyle = BlogReadStyle()
    const fetchMainBlog= async()=>{
        await axios.get(`${baseUrl}get_blog/${route.params.id}`)
        .then((response)=>{
            setBlog(response.data)
            setOwner(JSON.stringify(blog.owner, null, 2))
        })
        .catch((err)=> alert(err))
    }

    const fetchLatests = async()=>{
        await axios.get(`${baseUrl}latest/`)
        .then((response)=>{
            setData(response.data)
        })
        // .catch((err)=> alert(err))
    }

    useEffect(()=>{
        // alert( JSON.stringify(route.params.id))
        fetchMainBlog()
        fetchLatests()
    }, [route.params.id])

    useEffect(() => {
        // Scroll the ScrollView to the top when the route parameter changes
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: false })
        }
    }, [route.params.id])

    if (!blog.owner?.owner_name) {
        return <View
        style=
        {{
            height: windowHeight,
            backgroundColor:darkTheme?'#121212':'#ffffff',
            alignItems: 'center',alignContent:'center'
        }}><Text>Fetching...</Text></View>
    }

    return(
        <SafeAreaView style={{height: windowHeight,backgroundColor:darkTheme?'#121212':'#ffffff'}}>
            <View>
                <ScrollView
                showsVerticalScrollIndicator={false}
                ref={scrollViewRef}
                >
                    <View style={blogReadStyle.container}>
                        <View>
                            <Blog blog={blog} owner={owner}/>
                        </View>
                        <View style={blogReadStyle.trendingWrapper}>
                            <Text style={blogReadStyle.trendingText}>Popular, Latest Blogs </Text>
                            <View style={{ flexWrap: 'wrap',flexDirection:'row',
                                alignContent: 'space-between',
                                alignItems: 'space-between'}}
                            >
                                <FlatList
                                    data={data}
                                    keyExtractor={(data, index) => index.toString()}
                                    renderItem={({ item }) => <BlogTrendCard data={item}
                                    onPress={
                                        ()=>
                                            {
                                                // navigation.pop()
                                                navigation.navigate('BlogRead',{id:item.id})
                                            }
                                    }/>}
                                    numColumns = {windowWidth>800? 3: 2}
                                />
                            </View>
                        </View>
                            <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={blogReadStyle.extendedBtn}>
                                <Text style={blogReadStyle.extendText}>Get more stories</Text>
                                <Feather name="arrow-right" size={24} color={darkTheme?'#ffffff': '#121212'} />
                            </TouchableOpacity>
                        <Spacer/>
                        <BottomSide/>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default BlogRead
