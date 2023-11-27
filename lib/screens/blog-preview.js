import React,{useEffect,useState} from 'react'
import { SafeAreaView,View, Text,TouchableOpacity, ScrollView} from 'react-native'
import BottomSide from '../components/bottom-side'
import PreviewBlogContent from '../components/blog-preview-component'
import FormData from 'form-data'
import axios from 'axios'
import { useTheme } from '../utils/state-context'
import { BlogPreviewStyle } from '../utils/app-styles'



const NewPostPreview=({navigation,route})=>{
    //initializing styles
    const blogPreviewStyle = BlogPreviewStyle()
    //get necessary data from route params
    const{title, content, imageCopyRight,file,selectedImages} = route.params
    //initializing the token
    const {token} = useTheme()
    // set for form-data post format
    const data = new FormData()
    //adding values to be upload to the api endpoint
    data.append('title',title)
    // data.append('story',content)
    content.forEach((section, index) => {
        data.append('story', section.text)
    })
    data.append('frontImage',file)
    data.append('imageCopyRight',imageCopyRight)

    selectedImages.forEach(async (image, index) => {
        try{
            // Use regex to extract the MIME type
            const mimeTypeMatch = image.assets[0].uri.match(/^data:(image\/\w+);base64,/)
            //fetching the blob
            const response = await fetch(image.assets[0].uri)
            const blob = await response.blob()
            if (mimeTypeMatch) {
                const mimeType = mimeTypeMatch[1].split('/').pop()
                const filename = `image_${index}.${mimeType}`
                // appending the image
                data.append('contentImages',blob,filename)
            }
        }catch(err){
            //display an error
            alert(err.message)
        }
    })

    const postBlog = async()=>{
        await axios.post('https://yetublog.com/create/',data,
        {
            headers:{Authorization: `Token ${token}`,'Content-Type': 'multipart/form-data'},
        })
        .then((response)=>{
            alert(`Successfully created blog ${title}`)
            //return author to the create-post page
            navigation.popToTop()
            //pushes the author to the home page
            navigation.navigate('Home')
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
                                        file={file} selectedImages={selectedImages}
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
