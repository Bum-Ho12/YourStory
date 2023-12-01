import React,{useEffect, useState} from 'react'
import {View,Text,ScrollView,
    TouchableOpacity,FlatList} from 'react-native'
import { windowWidth } from '../utils/dimensions'
import BottomSide from '../components/bottom-side'
import axios from 'axios'
import {useTheme } from '../utils/state-context'
import { HomeStyle} from '../utils/app-styles'
import ExecuteCard from '../components/execute-card'
import { baseUrl } from '../utils/urls'


const MyBlogs=({navigation})=>{
    // initializing styles
    const homeStyle = HomeStyle()
    //fetch token
    const {token} = useTheme()
    //hooks for storing data
    const [data, setData] = useState([])
    const [blogs, setBlogs] = useState([])

    const fetchStatistics = async()=>{
        await axios.get(`${baseUrl}statistics/`,{
            headers:{
                Authorization: `Token ${token}`,
                // 'Content-Type': 'multipart/form-data'
            },
        })
        .then((response)=>{
            setData(response.data)
        })
        .catch((err)=> alert(err.message))
    }
    const fetchBlogs= async()=>{
        await axios.get(`${baseUrl}user_blogs/`,{
            headers:{
                Authorization: `Token ${token}`,
                // 'Content-Type': 'multipart/form-data'
            },
        })
        .then((response)=>{
            setBlogs(response.data)
        })
        .catch((err)=> alert(err))
    }
    useEffect(()=>{
        fetchBlogs()
        fetchStatistics()
    }, [])
    return(
            <View>
                <ScrollView
                showsVerticalScrollIndicator={false}
                >
                <View style={homeStyle.contentWrapper}>
                    <View style={homeStyle.container}>
                        <View >
                            <View style={homeStyle.upperWrapper}>
                                <View>
                                    <Text style={homeStyle.title}>
                                        Blog Performance Overall
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={homeStyle.btnWrapper}>
                                        <TouchableOpacity
                                        style={homeStyle.btn}
                                        >
                                            <Text style={homeStyle.preText}>
                                                Monthly Traffic:
                                            </Text>
                                            <Text style={homeStyle.btnText}>
                                                {` ${data.total_views}`}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={homeStyle.btnWrapper}>
                                        <TouchableOpacity
                                        style={homeStyle.btn}
                                        >
                                            <Text style={homeStyle.preText}>
                                                Total Blogs:
                                            </Text>
                                            <Text style={homeStyle.btnText}>
                                                {` ${data.blogs}`}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={homeStyle.btnWrapper}>
                                        <TouchableOpacity
                                        style={homeStyle.btn}
                                        >
                                            <Text style={homeStyle.preText}>
                                                Total Votes:
                                            </Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{flexDirection: 'row', margin: 10 }}>
                                                    <Text style={homeStyle.preText}>
                                                        Likes:
                                                    </Text>
                                                    <Text style={homeStyle.btnText}>
                                                        {` ${data.likes}`}
                                                    </Text>
                                                </View>
                                                <View style={{flexDirection: 'row', margin: 10 }}>
                                                    <Text style={homeStyle.preText}>
                                                        Dislikes:
                                                    </Text>
                                                    <Text style={homeStyle.btnText}>
                                                        {` ${data.dislikes}`}
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={homeStyle.btnWrapper}>
                                        <TouchableOpacity
                                        style={homeStyle.btn}
                                        >
                                            <Text style={homeStyle.preText}>
                                                Comments:
                                            </Text>
                                            <Text style={homeStyle.btnText}>
                                                Coming Soon!
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={homeStyle.lowerWrapper}>
                                    <View>
                                        <Text style={homeStyle.trendingTitle}>
                                            Popular, Latest Blogs and Topics
                                        </Text>
                                    </View>
                                    <View>
                                        <FlatList
                                            data={blogs}
                                            keyExtractor={(data, index) => index.toString()}
                                            renderItem={({ item }) => <ExecuteCard data={item} navigation={navigation}
                                            />}
                                            numColumns = {windowWidth>800? 3: 2}
                                        />
                                    </View>
                            </View>
                        </View>
                    </View>
                        <BottomSide/>
                    </View>
                </ScrollView>
            </View>
    )
}

export default MyBlogs
