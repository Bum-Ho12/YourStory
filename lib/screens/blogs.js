import React, {useEffect, useState} from 'react'
import {View,Text,SafeAreaView,
    ScrollView,ImageBackground, TouchableOpacity,
    FlatList} from 'react-native'
import BlogCard from '../components/blog-card'
import BottomSide from '../components/bottom-side'
import axios from 'axios'
import { windowWidth,windowHeight } from '../utils/dimensions'
import { BlogsStyle } from '../utils/app-styles'
import { Spacer } from 'react-native-flex-layout'
import { useTheme } from '../utils/state-context'


const Blogs = ({navigation}) => {
    const [data, setData] = useState()
    const [latestBlogs, setLatestBlogs] = useState()
    const [allBlogs, setAllBlogs] = useState()
    const blogsStyle = BlogsStyle()
    const {darkTheme} = useTheme()
    const preText = 'We have rich content from\ndifferent personalities and experiences.\nTell your story and let it be known.'
    useEffect(()=>{
        // fetches all blogs
        axios.get("https://backend.yetublog.com/")
        .then((response)=>{
            setAllBlogs(response.data)
        })
        .catch((err)=> alert(err))
        // fetches all blogs
        axios.get("https://backend.yetublog.com/popular/")
        .then((response)=>{
            setLatestBlogs(response.data)
        })
        // .catch((err)=> alert(err))

        // fetches latest blogs
        axios.get("https://backend.yetublog.com/latest/")
        .then((response)=>{
            setData(response.data)
        })
        // .catch((err)=> alert(err))
    }, [])

    if (!data) {
        return <View style={{height: windowHeight,backgroundColor:darkTheme?'#121212':'#ffffff'}}></View>
    }

    return(
        <SafeAreaView style={{height: windowHeight,backgroundColor:darkTheme?'#121212':'#ffffff'}}>
            <View>
                <ScrollView
                showsVerticalScrollIndicator={false}
                >
                    <View style={blogsStyle.starter}>
                        <ImageBackground
                            source={require('../../assets/nairobi.jpg')}
                            style={blogsStyle.backgroundImage}
                        >
                            <View style={[blogsStyle.overlay, { backgroundColor: 'rgba(0,0,0, 0.8)',
                                alignContent:'center', justifyContent: 'center'
                            }]}>
                                <View style={{ flexDirection: 'row' ,marginBottom: 20,}} >
                                    <View>
                                            <Text style={blogsStyle.titleText}>Tell YourStory, get YourStory </Text>
                                            <Text style={blogsStyle.titleText}>Home of Stories... </Text>
                                    </View>
                                    <View style={{ width: windowWidth*0.1 }} />
                                    <Text style={blogsStyle.preText}>{preText}</Text>
                                </View>
                                <TouchableOpacity
                                        style={blogsStyle.btn}
                                        onPress={()=>navigation.navigate('Subscription')}
                                    >
                                        <Text style={blogsStyle.text} >Get All our Updates</Text>
                                    </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={blogsStyle.container}>
                        <View style={blogsStyle.trendingWrapper}>
                            <Text style={blogsStyle.trendingText}>Latest Stories</Text>
                            <View>
                                <FlatList
                                    data={data}
                                    keyExtractor={(data, index) => index.toString()}
                                    renderItem={({ item }) => <BlogCard data={item}
                                    onPress={()=>navigation.navigate('BlogRead',{id:item.id})}/>}
                                    numColumns = {windowWidth>800? 3: 2}
                                />
                            </View>
                        </View>
                        <View style={blogsStyle.trendingWrapper}>
                            <Text style={blogsStyle.trendingText}>All Stories </Text>
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
                        <BottomSide/>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Blogs