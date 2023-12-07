import React,{useEffect,useState} from 'react'
import { SafeAreaView,View, Text,TouchableOpacity, ScrollView} from 'react-native'
import BottomSide from '../components/bottom-side'
import PreviewBlogContent from '../components/blog-preview-component'
import axios from 'axios'
import { useTheme } from '../utils/state-context'
import { BlogPreviewStyle } from '../utils/app-styles'
import { baseUrl } from '../utils/urls'
import imageSupabaseHandler from '../utils/image-upload-handler'
import dataHandler from '../utils/form-data-handler'



const NewPostPreview=({navigation,route})=>{
    //initializing styles
    const blogPreviewStyle = BlogPreviewStyle()
    //get necessary data from route params
    const{title, content, imageCopyRight,file} = route.params
    //initializing the token
    const {token} = useTheme()
    const postBlog = async()=>{
        await Promise.all(
            content.map((item)=>{
                if(item.type ==='image'){
                    imageSupabaseHandler({item:item})
                    .then(({data,error})=>{
                        if(!error){
                            item.url = data
                        }
                    })
                }
            })
        )
        const handler = dataHandler({
            title:title,content: content,
            imageCopyRight:imageCopyRight,file: file
        })
        await axios.post(`${baseUrl}create/`,handler,
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
