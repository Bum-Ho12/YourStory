//describes the title, image and content paragraphs layout visible to the customers.
//styling is described below the component.
import React from 'react'
import {View, Text,Image, ScrollView} from 'react-native'
import { windowWidth } from '../utils/dimensions'
import { Ionicons } from '@expo/vector-icons'
import { BlogContentPreviewStyle } from '../utils/app-styles'


function PreviewBlogContent({title,content,imageCopyRight,file,selectedImages}){
    //initializing styles
    const blogContentPreviewStyle = BlogContentPreviewStyle()
    //date management
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    const mergedContent = [];
    for (let i = 0; i < Math.max(selectedImages.length, content.length); i++) {
        if (i < content.length) {
            mergedContent.push({ type: 'story', data: content[i] });
            }
        if (i < selectedImages.length) {
        mergedContent.push({ type: 'image', data: selectedImages[i] });
        }
    }

    return(
        <View style={blogContentPreviewStyle.container}>
            {/* Upper Wrapper */}
            <View style={blogContentPreviewStyle.upperWrapper}>
                <View style={blogContentPreviewStyle.bioWrapper}>
                    <View style={{ width: windowWidth>800?200:150 }}>
                        <Text style={blogContentPreviewStyle.title}>
                            {title}
                        </Text>
                    </View>
                    <View>
                        <Ionicons name='person-circle-outline'
                        size={windowWidth>800?50:30} />
                    </View>
                </View>
                <View style= {blogContentPreviewStyle.imgWrapper}>
                    <Image source={{ uri: URL.createObjectURL(file) }} style={blogContentPreviewStyle.img} />
                    <Text style={blogContentPreviewStyle.imgCopyrightText}>{imageCopyRight}</Text>
                </View>
            </View>
            {/* Lower Wrapper */}
            <View style={blogContentPreviewStyle.lowerWrapper}>
                {mergedContent.map((item, index) => (
                    <View key={index}>
                        {item.type === 'story' && (
                            <Text key={index} style={blogContentPreviewStyle.contentText}>
                            {item.data.text}
                            </Text>
                        )}
                        {item.type === 'image' && (
                            <Image
                            source={{ uri: item.data.assets[0].uri }}
                            // style={{ width: 100, height: 100, marginRight: 10 }}
                            style={blogContentPreviewStyle.img}
                            />
                        )}
                    </View>
                ))}
            </View>
        </View>
    )
}

export default PreviewBlogContent