// this component is a card that describes the layout of the blogs card
// its style is defined inside this file with imported dimensions

import React from 'react'
import {View, Text,TouchableOpacity,Image} from 'react-native'
import { ListCardStyle,BlogContentStyle } from '../utils/app-styles'
import { baseUrlImage } from '../utils/urls'
import {Feather} from '@expo/vector-icons'
import { useTheme } from '../utils/state-context'


const ListCard=({onPress,data})=>{

    const styles = ListCardStyle()
    const {darkTheme} = useTheme()

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
            <TouchableOpacity
            onPress={onPress}
            >
                <Text style = {styles.authorText}>
                    {`By ${data?.owner?.owner_name}`}
                </Text>
                <Text style={styles.txt}>{data.title}</Text>
                <Text numberOfLines={2} ellipsizeMode="tail" style = {styles.contentText}>
                    {data.story[0].story}
                </Text>
                <View style={{ flexDirection: 'row' }} >
                    <Text style={{ ...styles.dateText,fontWeight: 'bold', marginTop: 5}}>
                        {`${Math.ceil(content[0].story.length/1500*content.length)} min Read  .  ${monthNames[month]} ${day}, ${year} `}
                    </Text>
                    <View style={styles.viewsSection}>
                        <Feather name="eye" size={20} color={darkTheme?'#ffffff': '#121212'} />
                        <Text style={{ ...styles.dateText,marginLeft: 2 }}>{data.views}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Image source={{ uri: `${baseUrlImage}${data.frontImage}` }} style={styles.img}/>
        </View>
    )
}
export default ListCard
