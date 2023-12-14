// import { supabase } from "./initSupabase";

// const imageSupabaseHandler = async ({ item }) => {
//     try {
//         const { data, error } = await supabase
//         .storage.from('image-stories')
//         .upload(item.filename, item.assets[0].uri)

//         if (error) {
//         console.error('Upload error:', error.message)
//         return { data: null, error: error.message }
//         }

//         const { data: urlData, error: urlError } = await supabase
//             .storage.from('image-stories')
//             .getPublicUrl(item.filename)

//         if (urlError) {
//         console.error('Got a URL error:', urlError.message)
//         return { data: null, error: urlError.message }
//         }

//         return { data: urlData, error: null }
//     } catch (exception) {
//         console.error('Exception:', exception.message)
//         return { data: null, error: exception.message }
//     }
// };

// export default imageSupabaseHandler
