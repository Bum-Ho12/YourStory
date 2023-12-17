// this component is a card that describes the layout of the blogs card
// its style is defined inside this file with imported dimensions

import React from 'react'
import {View, Text,TouchableOpacity,Image} from 'react-native'
import { BlogCardStyle,BlogContentStyle } from '../utils/app-styles'
import { useTheme } from '../utils/state-context'
import FormData from 'form-data'
import axios from 'axios'
import { baseUrl, baseUrlImage } from '../utils/urls'


const ExecuteCard=({onPress,data})=>{
    // const  nav = useNavigation()
    const styles = BlogCardStyle()
    const blogContentStyle = BlogContentStyle()
    const {token} = useTheme()

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
    // set for form-data post format
    const formData= new FormData()
    formData.append('id',data.id)

    const deleteBlog = async()=>{
        // alert(formData)
        await axios.delete(
            `${baseUrl}delete/`,
            // formData,
            {
                headers:
                {
                    Authorization: `Token ${token}`,
                    // 'Content-Type': 'multipart/form-data',
                },
                data: formData,
            }
        ).then((response)=>{
            alert(response.data)
            navigation.navigate('MyBlogs')
        }).catch((err)=>{
            alert(err)
        })
    }
    return(
        <View style={styles.container} key={data.id}>
            <Image source={{ uri: `${baseUrlImage}${data.frontImage}` }} style={styles.img}/>
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
            </TouchableOpacity>
            <View>
                <TouchableOpacity style={styles.btn} onPress={deleteBlog}>
                    <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default ExecuteCard
