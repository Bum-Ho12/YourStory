import React, {useEffect, useState} from 'react'
import {View,Text,SafeAreaView,
    ScrollView,ImageBackground, TouchableOpacity,
    FlatList} from 'react-native'
import BottomSide from '../components/bottom-side'
import axios from 'axios'
import { windowWidth,windowHeight } from '../utils/dimensions'
import { BlogsStyle } from '../utils/app-styles'
import { useTheme } from '../utils/state-context'
import {baseUrl} from '../utils/urls'
import ListCard from '../components/list-card'
import TopicButton from '../components/topic-button'


const Blogs = ({navigation}) => {
    const [data, setData] = useState()
    const [topics, setTopics] = useState()
    const blogsStyle = BlogsStyle()
    const {darkTheme} = useTheme()
    const preText = 'We have rich content from\ndifferent personalities and experiences.\nTell your story and let it be known.'
    useEffect(()=>{
        // fetches latest blogs
        axios.get(`${baseUrl}latest/`)
        .then((response)=>{
            setData(response.data)
        })

        // fetches topics
        axios.get(`${baseUrl}topics/`)
        .then((response)=>{
            setTopics(response.data)
            alert(JSON.stringify(topics))
        })
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
                            <View style={{ flexDirection: 'row', flexWrap:'wrap'}} >
                                {windowWidth<=800 && <View style={blogsStyle.topicsWrapper}>
                                    <Text style={blogsStyle.trendingText} >Latest topics</Text>
                                </View>}
                                <View style={blogsStyle.trendingWrapper}>
                                    <Text style={blogsStyle.trendingText}>Latest Stories</Text>
                                    <View>
                                        <FlatList
                                            data={data}
                                            keyExtractor={(data, index) => index.toString()}
                                            renderItem={({ item }) => <ListCard data={item}
                                            onPress={()=>navigation.navigate('BlogRead',{id:item.id})}/>}
                                            numColumns = {1}
                                        />
                                    </View>
                                </View>
                                {windowWidth>800 && <View style={blogsStyle.topicsWrapper}>
                                    <Text style={blogsStyle.trendingText} >Latest topics</Text>
                                    <View>
                                        {topics.map((topic)=>
                                            <TouchableOpacity>
                                                <TopicButton topic={topic}/>
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>}
                            </View>
                        <BottomSide/>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Blogs
