// this component is a card that describes the layout of the blogs card
// its style is defined inside this file with imported dimensions

import React from 'react'
import {View, Text,TouchableOpacity,Image} from 'react-native'
import { BlogCardStyle,BlogContentStyle } from '../utils/app-styles'


const BlogCard=({onPress,data})=>{
    // const  nav = useNavigation()
    const styles = BlogCardStyle()
    const blogContentStyle = BlogContentStyle()

    //date management
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ]
    const dateObject = new Date(data.created_at)
    const year = dateObject.getFullYear()
    const month = dateObject.getMonth()
    const day = dateObject.getDate()
    // converts story object to string
    const content = data.story
    return(
        <View style={styles.container} key={data.id}>
            <Image source={{ uri: `https://yetublog.com/${data.frontImage}` }} style={styles.img}/>
            <TouchableOpacity
            onPress={onPress}
            >
                <Text style={styles.txt}>{data.title}</Text>
                <Text style = {blogContentStyle.contentText}>
                    {`By ${data?.owner?.owner_name}`}
                </Text>
                <Text style={{ ...blogContentStyle.editorText,fontWeight: 'bold' }}>
                    {`.  ${Math.ceil(content[0].story.length/1500*content.length)} min Read  .  ${day} ${monthNames[month]}, ${year} `}
                </Text>
                {/* <Text style={{ ...blogContentStyle.editorText,fontWeight: 'bold',paddingTop: 10 }}>
                    {`${Math.ceil(content.length/1500)} min Read`}
                </Text> */}
            </TouchableOpacity>
        </View>
    )
}
export default BlogCard
