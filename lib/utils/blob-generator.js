const blogGenerator = async({imageContent,newIndex})=>{
    try{
        // Use regex to extract the MIME type
        const mimeTypeMatch = imageContent.assets[0].uri.match(/^data:(image\/\w+);base64,/)
        //fetching the blob
        const response = await fetch(imageContent.assets[0].uri)
        const blob = await response.blob()
        const filename = `image_${newIndex}.${mimeTypeMatch[1].split('/').pop()}`

        return {blob,filename}
    }catch(err){
        //display an error
        alert(`Blob: ${err.message}`)
        return {blob:null,filename: null}
    }
}

export default blogGenerator