import React,{useEffect,useState} from 'react'
import {View,Text,SafeAreaView,
    TouchableOpacity,
    ScrollView,
    FlatList} from 'react-native'
import BottomSide from '../components/bottom-side'
import axios from 'axios'
import { windowHeight, windowWidth } from '../utils/dimensions'
import { HomeStyle } from '../utils/app-styles'
import { Spacer } from 'react-native-flex-layout'
import { useTheme } from '../utils/state-context'
import {baseUrl} from '../utils/urls'
import BlogTrendCard from '../components/blog-trend-card'
import ListCard from '../components/list-card'
import ContactInfo from '../components/contact-info'
import TopicButton from '../components/topic-button'


const Home = ({navigation}) => {
    const [data, setData] = useState([])
    const [blog, setBlog] = useState([])
    const [allBlogs, setAllBlogs] = useState()
    const [owner, setOwner] = useState()
    const {darkTheme,topics,setTopics} = useTheme()
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
        await axios.get(`${baseUrl}latest/`)
        .then((response)=>{
            setData(response.data)
        })
        .catch((err)=> alert(err.status))
    }
    // fetches all blogs
    axios.get(`${baseUrl}`)
    .then((response)=>{
        setAllBlogs(response.data)
    })
    .catch((err)=> alert(err))

    const fetchTopics = async()=>{
        // fetches topics
        await axios.get(`${baseUrl}topics/`)
        .then((response)=>{
            setTopics(response.data)
        })
    }

    const fetchMainBlog= async()=>{
        await axios.get(`${baseUrl}latest_blog/`)
        .then((response)=>{
            setBlog(response.data)
            setOwner(JSON.stringify(blog.owner, null, 2))
        })
        .catch((err)=> alert(JSON.stringify(err)))
    }

    useEffect(()=>{
        fetchMainBlog()
        fetchLatests()
        fetchTopics()
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
                            <View style={homeStyle.trendingWrapper}>
                                {/* <Text style={homeStyle.trendingText}>Latest Stories Published </Text> */}
                                <View style={{ flexWrap: 'wrap',flexDirection: windowWidth>800? 'row':'column',
                                    alignContent: 'space-between',
                                    alignItems: 'space-between'}}
                                >
                                    <FlatList
                                        data={data}
                                        keyExtractor={(data, index) => index.toString()}
                                        renderItem={({ item }) => <BlogTrendCard data={item}
                                        onPress={()=>navigation.navigate('BlogRead',{id:item.id})}/>}
                                        numColumns={windowWidth>800?3:2}

                                    />
                                </View>
                            </View>
                            <Text style={homeStyle.trendingText}>All Stories </Text>
                            <View style={homeStyle.otherWrapper}>
                                <View>
                                    <FlatList
                                        data={allBlogs}
                                        keyExtractor={(allBlogs, index) => index.toString()}
                                        renderItem={({ item }) => <ListCard data={item}
                                        onPress={()=>navigation.navigate('BlogRead',{id:item.id})}/>}
                                        numColumns = {1}
                                    />
                                </View>
                                {windowWidth>800 && <View style={homeStyle.topicsWrapper}>
                                    <View style={{ flexWrap:'wrap',flexDirection: 'row'}} >
                                        {topics.map((topic)=>(
                                            <TouchableOpacity>
                                                <TopicButton topic={topic}/>
                                            </TouchableOpacity>)
                                        )}
                                    </View>
                                    <ContactInfo/>
                                </View>}
                            </View>
                            <Spacer/>
                            {windowWidth<800 && <BottomSide/>}
                        </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Home
