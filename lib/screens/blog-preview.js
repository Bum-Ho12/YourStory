import React,{useEffect,useState} from 'react'
import { SafeAreaView,View, Text,TouchableOpacity, ScrollView} from 'react-native'
import BottomSide from '../components/bottom-side'
import PreviewBlogContent from '../components/blog-preview-component'
import FormData from 'form-data'
import axios from 'axios'
import { useTheme } from '../utils/state-context'
import { BlogPreviewStyle } from '../utils/app-styles'
import { baseUrl } from '../utils/urls'



const NewPostPreview=({navigation,route})=>{
    //initializing styles
    const blogPreviewStyle = BlogPreviewStyle()
    //get necessary data from route params
    const{title, content, imageCopyRight,file,data} = route.params
    //initializing the token
    const {token} = useTheme()
    const postBlog = async()=>{
        for (const pair of data.entries()) {
            console.log(pair[0], pair[1]);
        }
        await axios.post(`${baseUrl}create/`,data,
        {
            headers:{Authorization: `Token ${token}`,'Content-Type': 'multipart/form-data'},
        })
        .then((response)=>{
            alert(`Successfully created blog ${title}`)
            navigation.replace('MyBlogs')
        }).catch((err)=>{
            alert(err.message)
        })
    }
    return(
        <SafeAreaView>
            <View>
                <ScrollView
                style={ blogPreviewStyle.container }
                showsVerticalScrollIndicator={true}
                >
                    <View>
                        <View style={blogPreviewStyle.container}>
                            <View style={{ alignItems: 'flex-start' }}>
                                <TouchableOpacity
                                    style={blogPreviewStyle.btn}
                                    onPress={postBlog}
                                    >
                                        <Text style={blogPreviewStyle.btnText}>Post</Text>
                                </TouchableOpacity>
                                <View style={blogPreviewStyle.contentWrapper}>
                                    <PreviewBlogContent
                                        title={title} content={content}
                                        imageCopyRight={imageCopyRight}
                                        file={file}
                                    />
                                </View>
                            </View>
                        </View>
                        <BottomSide/>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default NewPostPreview
