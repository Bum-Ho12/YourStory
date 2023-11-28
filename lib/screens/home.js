import React,{useEffect,useState} from 'react'
import {View,Text,SafeAreaView,
    ScrollView,
    FlatList} from 'react-native'
import Blog from '../components/blog-content'
import BlogCard from '../components/blog-card'
import BottomSide from '../components/bottom-side'
import axios from 'axios'
import { windowHeight, windowWidth } from '../utils/dimensions'
import { HomeStyle } from '../utils/app-styles'
import { Spacer } from 'react-native-flex-layout'
import { useTheme } from '../utils/state-context'


const Home = ({navigation}) => {
    const [data, setData] = useState([])
    const [blog, setBlog] = useState([])
    const [allBlogs, setAllBlogs] = useState()
    const [owner, setOwner] = useState()
    const {darkTheme} = useTheme()
    const homeStyle = HomeStyle()
    //assigns months
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    //assigning latest date
    const dateObject = new Date()
    const year = dateObject.getFullYear()
    const month = dateObject.getMonth()
    const day = dateObject.getDate()
    //for detecting level reached
    const [scrolledToTwoThirds, setScrolledToTwoThirds] = useState(false)

    const fetchLatests = async()=>{
        await axios.get("https://backend.yetublog.com/latest/")
        .then((response)=>{
            setData(response.data)
        })
        .catch((err)=> alert(err.status))
    }
    // fetches all blogs
    axios.get("https://backend.yetublog.com/")
    .then((response)=>{
        setAllBlogs(response.data)
    })
    .catch((err)=> alert(err))

    const fetchMainBlog= async()=>{
        await axios.get("https://backend.yetublog.com/latest_blog/")
        .then((response)=>{
            setBlog(response.data)
            setOwner(JSON.stringify(blog.owner, null, 2))
        })
        .catch((err)=> alert(JSON.stringify(err)))
    }

    useEffect(()=>{
        fetchMainBlog()
        fetchLatests()
    }, [])

    //handles onscroll events
    const handleScroll = (event) => {
        const contentHeight = event.nativeEvent.contentSize.height
        const scrollOffset = event.nativeEvent.contentOffset.y
        const twoThirds = (2/5) * contentHeight

        if (scrollOffset >= twoThirds && !scrolledToTwoThirds) {
            setScrolledToTwoThirds(true)
            // Trigger your response here
            alert("User reached 2/3 of the content")
        }
    }

    if (!blog.owner?.owner_name) {
        return <View
        style=
        {{
            height: windowHeight,
            backgroundColor:darkTheme?'#121212':'#ffffff',
            alignItems: 'center',alignContent:'center'
        }}></View>
    }

    return(
        <SafeAreaView style={{height: windowHeight,backgroundColor:darkTheme?'#121212':'#ffffff'}}>
            <View>
                <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={(event)=>handleScroll(event)}
                >
                        <View style={homeStyle.container}>
                            <View style = {homeStyle.trendingWrapper}>
                                <Text style={homeStyle.latestText}>Latest Publish and Other stories</Text>
                                {<View style={homeStyle.dateTimeWrapper}>
                                    <Text style={homeStyle.dateText}>{`Today ${day} ${monthNames[month]}, ${year} `}</Text>
                                </View>}
                            </View>
                            {/* <View>
                                <Blog blog={blog} owner={owner}/>
                            </View> */}
                            <View style={homeStyle.trendingWrapper}>
                                <Text style={homeStyle.trendingText}>Latest Stories Published </Text>
                                <View style={{ flexWrap: 'wrap',flexDirection:'row',
                                    alignContent: 'space-between',
                                    alignItems: 'space-between'}}
                                >
                                    <FlatList
                                        data={data}
                                        keyExtractor={(data, index) => index.toString()}
                                        renderItem={({ item }) => <BlogCard data={item}
                                        onPress={()=>navigation.navigate('BlogRead',{id:item.id})}/>}
                                        numColumns = {windowWidth>800? 3: 2}
                                    />
                                </View>
                            </View>
                            <View style={homeStyle.trendingWrapper}>
                                <Text style={homeStyle.trendingText}>All Stories </Text>
                                <View>
                                    <FlatList
                                        data={allBlogs}
                                        keyExtractor={(allBlogs, index) => index.toString()}
                                        renderItem={({ item }) => <BlogCard data={item}
                                        onPress={()=>navigation.navigate('BlogRead',{id:item.id})}/>}
                                        numColumns = {windowWidth>800? 3: 2}
                                    />
                                </View>
                            </View>
                            <Spacer/>
                            <BottomSide/>
                        </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Home
