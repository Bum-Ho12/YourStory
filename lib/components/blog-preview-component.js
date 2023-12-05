//describes the title, image and content paragraphs layout visible to the customers.
//styling is described below the component.
import React from 'react'
import {View, Text,Image, ScrollView} from 'react-native'
import { windowWidth } from '../utils/dimensions'
import { Ionicons } from '@expo/vector-icons'
import { BlogContentPreviewStyle } from '../utils/app-styles'


function PreviewBlogContent({title,content,imageCopyRight,file}){
    //initializing styles
    const blogContentPreviewStyle = BlogContentPreviewStyle()
    //date management
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

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
                {content.map((item, index) => (
                    <View key={index}>
                        {item.type === 'paragraph' && (
                            <Text style={blogContentPreviewStyle.contentText}>
                            {item.text}
                            </Text>
                        )}
                        {item.type === 'image' && (
                            <Image
                            source={{ uri: item.assets[0].uri }}
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