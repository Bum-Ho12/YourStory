//describes the title, image and content paragraphs layout visible to the customers.
//styling is described below the component.
import React, {useState} from 'react'
import {View, Text,TouchableOpacity,Image} from 'react-native'
import axios from 'axios'
import FormData from 'form-data'
import { windowWidth } from '../utils/dimensions'
import { Feather } from '@expo/vector-icons'
import { BlogContentStyle } from '../utils/app-styles'
import { useTheme } from '../utils/state-context'
import { baseUrl, baseUrlImage } from '../utils/urls'


function BioContent({blog}){
    const {darkTheme} = useTheme()
    //date management
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    const dateObject = new Date(blog.created_at)
    const year = dateObject.getFullYear()
    const month = dateObject.getMonth()
    const day = dateObject.getDate()
    const hours = dateObject.getHours()
    const minutes = dateObject.getMinutes()

    const blogContentStyle = BlogContentStyle()
    // converts story object to string
    const content = blog?.story

    return(
        <View style={blogContentStyle.bioWrapper}>
            <View style={blogContentStyle.dateTimeWrapper}>
                <Text style={blogContentStyle.dateText}>{`Posted on ${day} ${monthNames[month]}, ${year} `}</Text>
                <Text style={blogContentStyle.timeText}>{`${hours} : ${minutes} ${hours>11?'pm': 'am'} `}</Text>
            </View>
            <Text style = {blogContentStyle.editorText}>
                {`By ${blog?.owner?.owner_name}`}
            </Text>
            <View >
                <Text style={blogContentStyle.contentText}>
                    {`Talks About: ${blog?.owner?.owner_description}`}
                </Text>
            </View>
            <Text style={{ ...blogContentStyle.dateText,fontWeight: 'bold' }}>
                {/*calculates approximate duration able to read the blog*/}
                {`.   ${Math.ceil(content[0].story.length/1500*content.length)} min Read`}
            </Text>
        </View>
    )
}


function Blog({blog}){
    const {darkTheme} = useTheme()
    const [expanded, setExpanded] = useState(false)

    const blogContentStyle = BlogContentStyle()

    // converts story object to string
    const selectedImages = blog?.contentImage
    const mergedContent = []
    const contentReadMore =[]
    // converts story object to string
    const content = blog?.story

    if(content && selectedImages){
        for (let i = 0; i < Math.max(selectedImages.length, content.length); i++) {
            if (i < content.length) {
                mergedContent.push({ type: 'story', data: content[i] })
                }
            if (i < selectedImages.length) {
            mergedContent.push({ type: 'image', data: selectedImages[i] })
            }
        }
    }

    if(content && selectedImages){
        contentReadMore.push({ type: 'story', data: content[0] })
        contentReadMore.push({ type: 'image', data: selectedImages[0] })
    }

    // function that toggles the expansion of content
    const toggleExpand = () => {
        setExpanded(!expanded)
    }
    // checks for delays and prevents crushing of blog
    if (!blog.story) {
        return <Text>Loading...</Text>;
    }

    const data = new FormData()
    data.append('id',blog.id)
    const sendLike = async()=>{
        await axios.post(`${baseUrl}like/`,data)
        .then((response)=>{
            window.location.reload()
        })
        .catch((error)=>alert(error))
    }
    const sendDislike = async()=>{
        await axios.post(`${baseUrl}dislike/`,data)
        .then((response)=> alert('Done, You disliked this blog'))
        .catch((error)=>alert(error))
    }
    // rendered component
    return(
        <View style={{ flexDirection: 'row', }}>
            {/* Action section */}
            <View style={blogContentStyle.actionWrapper} >
                <View style={{ alignItems: 'center',marginHorizontal: 10, marginVertical: 10 }}>
                            <TouchableOpacity>
                                <Feather name="eye" size={24} color={darkTheme?'#ffffff': '#121212'} />
                            </TouchableOpacity>
                            <Text style={blogContentStyle.dateText}>{blog.views}</Text>
                            {windowWidth> 600 && <Text style={blogContentStyle.dateText}>Views</Text>}
                    </View>
                    <View style={{ alignItems: 'center',
                    marginHorizontal:windowWidth>600?10:2, marginVertical: 10
                    }}>
                            <TouchableOpacity onPress={sendLike}>
                                <Feather name="thumbs-up" size={24} color={darkTheme?'#ffffff': '#121212'} />
                            </TouchableOpacity>
                            <Text style={blogContentStyle.dateText}>{blog.likes}</Text>
                            {windowWidth> 600 && <Text style={blogContentStyle.dateText}>Like</Text>}
                    </View>
                    <View style={{ alignItems: 'center',marginHorizontal: 10, marginVertical: 10 }}>
                            <TouchableOpacity onPress={sendDislike}>
                                <Feather name="thumbs-down" size={24} color={darkTheme?'#ffffff': '#121212'} />
                            </TouchableOpacity>
                            {windowWidth> 600 && <Text style={blogContentStyle.dateText}>Dislike</Text>}
                    </View>
                    <View style={{ alignItems: 'center',marginHorizontal: 10, marginVertical: 10 }}>
                            <TouchableOpacity>
                                <Feather name="message-circle" size={24} color={darkTheme?'#ffffff': '#121212'} />
                            </TouchableOpacity>
                            {windowWidth> 600 && <Text style={blogContentStyle.dateText}>comment</Text>}
                    </View>
            </View>
            <View style={blogContentStyle.container} key={blog.id}>
            {/* Upper Wrapper */}
                <View style={blogContentStyle.upperWrapper}>
                    {/* title section */}
                    <View style={{
                        width: windowWidth>800?windowWidth*0.5: windowWidth*0.7,
                        alignItems: 'flex-start',
                        marginVertical: 10,
                        }}>
                            <Text style={blogContentStyle.title}>
                                {blog.title}
                            </Text>
                    </View>
                    {/* Bio section */}
                    <BioContent blog={blog}/>
                    {/* Front Image section */}
                    <View style= {blogContentStyle.imgWrapper}>
                        <Image source={{ uri:`${baseUrlImage}${blog.frontImage}` }} style={blogContentStyle.img}/>
                        <Text style={blogContentStyle.imgCopyrightText}>{blog.imageCopyRight}</Text>
                    </View>
                </View>
                {/* Lower Wrapper */}
                <View style={blogContentStyle.lowerWrapper}>
                    {/* < style={{ width:windowWidth>800? 700:windowWidth>400?400: 300, }}> */}
                        {expanded?mergedContent.map((item, index) => (
                            <View key={index}>
                                    {item.type === 'story' && (
                                        <Text key={index} style={blogContentStyle.contentText}>
                                        {item.data.story}
                                        </Text>
                                    )}
                                    {item.type === 'image' &&  (
                                        <View style={blogContentStyle.imgContentWrapper}>
                                            <Image
                                            source={{ uri:`${baseUrlImage}${item.data.media}` }}
                                            style={blogContentStyle.contentImg}
                                            />
                                        </View>
                                    )}
                            </View>
                        )):
                        contentReadMore.map((item, index) => (
                            <View key={index}>
                                    {item.type === 'story' && (
                                        <Text key={index} style={blogContentStyle.contentText}>
                                        {item.data.story}
                                        </Text>
                                    )}
                                    {item.type === 'image' &&  (
                                        <View style={blogContentStyle.imgContentWrapper}>
                                            <Image
                                            source={{ uri:`${baseUrlImage}${item.data.media}` }}
                                            style={blogContentStyle.contentImg}
                                            />
                                        </View>
                                    )}
                            </View>
                        ))
                        }
                        {!expanded?
                            // expands the content to read it all
                            <TouchableOpacity onPress={toggleExpand} style={blogContentStyle.extendedBtn}>
                                <Text style={blogContentStyle.extendText}>Read more...</Text>
                            </TouchableOpacity>
                            :null
                        }
                    {/* choices and other reaction sections */}
                    {/* legal acknowledgement text */}
                    <View style={{ marginVertical: 10 ,alignItems:'flex-start',alignContent:'flex-start'}} >
                        <Text style={blogContentStyle.dateText}>
                            {`This material is the Product and craft of ${blog?.owner?.owner_name}`}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Blog