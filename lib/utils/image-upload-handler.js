import { createClient } from "@supabase/supabase-js"
import { supabaseKey, supabaseUrl } from "./urls"

const supabase = createClient(supabaseUrl,supabaseKey)

const imageSupabaseHandler = async({item})=>{
    const {data,error} = await supabase
    .storage.from('your_story_images')
    .upload(item.filename,item.assets[0].uri)

    if(error){
        console.log('Upload error: ',error)
    }else{
        const {data: urlData,error:urlError}= await supabase
        .storage.from('your_story_images')
        .getPublicUrl(item.filename)

        if(urlError){
            console.log('Got a URL error: ',urlError)
        }else{
            return {data: urlData,error: urlError}
        }
    }

    return {data,error}
}

export default imageSupabaseHandler