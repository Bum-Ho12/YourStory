import React,{useState} from 'react'
import { SafeAreaView,View, Text,TouchableOpacity,Image, ScrollView} from 'react-native'
import FormInput from '../components/formInput'
import BottomSide from '../components/bottom-side'
import { NewMultipleStyle } from '../utils/app-styles'
import * as ImagePicker from 'expo-image-picker'
import { windowWidth } from '../utils/dimensions'


const NewPostMultiple=({navigation})=>{
    //initializing the styles
    const newMultipleStyle = NewMultipleStyle()
    // data to upload to post api endpoint
    const [title, setTitle] = useState('')
    const [file, setFile] = useState(null)
    const [content, setContent] = useState([
        { type: 'paragraph', text: '' }, // Initial empty paragraph
    ])
    const [selectedImages, setSelectedImages] = useState([])
    const [imageCopyRight,setImageCopyRight] = useState('')

    //add paragraph to contents
    const handleAddParagraph=()=>{
        setContent([...content,{type:'paragraph',text:''}])
    }
    //handling changes in paragraphs
    const handleParagraphChange =(index,text)=>{
        const updatedContent = [...content]
        updatedContent[index].text = text
        setContent(updatedContent)
    }


    //adds images to content
    const handleFileChange = (image,isMainImage) => {
        const selectedFile = image.target.files[0]
        if (selectedFile) {
             //add main Image
            if(isMainImage){
                setFile(selectedFile)
            }
        }
    }
    const selectImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            allowsMultipleSelection: true,
        })
        if (!result.canceled) {
            setSelectedImages([...selectedImages, result])
        }
    }

    const ImageSelector=()=>{
        return (
            <View>
                <TouchableOpacity
                    style={newMultipleStyle.btn}
                    onPress={selectImages}
                >
                    <Text style={newMultipleStyle.btnText}>Select content images</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const deleteImage = (index) => {
        const newImages = [...selectedImages]
        newImages.splice(index, 1)
        setSelectedImages(newImages)
    }

    const deleteStory=()=>{
        setContent([{ type: 'paragraph', text: '' }]),
        setFile(null)
        setTitle('')
        setSelectedImages([])
        setImageCopyRight('')
        navigation.replace('MyBlogs')
    }

    return(
        <SafeAreaView>
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
                <View>
                    <View style={newMultipleStyle.container}>
                        {windowWidth<=600 && <View style={{ flexDirection: 'row',
                        alignContent: 'center', alignItems: 'center'
                        }} >
                            <TouchableOpacity
                            style={newMultipleStyle.btn}
                            onPress={
                                ()=>{
                                    if(title!==''&& content!==''&& imageCopyRight!=='' && file!==null){
                                        navigation.navigate('Preview',
                                        {
                                            title:title,content: content,
                                            imageCopyRight:imageCopyRight,file: file,selectedImages: selectedImages
                                        })
                                    }
                                    else{
                                        alert('Add all Entries')
                                    }
                                }
                            }
                                >
                                <Text style={newMultipleStyle.btnText}>Preview</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                            style={newMultipleStyle.btn}
                            onPress={deleteStory}
                            >
                                <Text style={newMultipleStyle.btnText}>Discard</Text>
                            </TouchableOpacity>
                        </View>}
                        <View style={newMultipleStyle.contentWrapper}>
                            {/* sets the title of the blog */}
                            <View>
                                <FormInput
                                title={'Blog Title:'}
                                label={title}//title data viewing
                                lineNum={windowWidth> 600?1:2}
                                placeholder={'the story title here'}
                                onChangeText = {(content) => setTitle(content)}//setting up title
                                />
                            </View>
                            {
                                windowWidth<=600 &&
                                <View>
                                    {/* component to handle upload of main main Landing Image */}
                                    <label htmlFor="file-input" style={newMultipleStyle.uploadButton}>
                                        Select Landing Image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="file-input"
                                        style={newMultipleStyle.input}
                                        onChange={(event)=> handleFileChange(event,true)}
                                    />
                                    {/* displays the main Image for preview */}
                                    {file &&
                                    <Image source={{ uri: URL.createObjectURL(file) }} style={{ width: 200, height: 200 }} />}
                                    <TouchableOpacity onPress={() => setFile(null)}>
                                        <Text style={newMultipleStyle.btnText}>Clear</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            {/* first part of the content */}
                            <View>
                                <FormInput
                                title={'Image copy-Right:'}
                                lineNum={windowWidth> 600?1:2}
                                label={imageCopyRight}// imageCopyright data viewing
                                placeholder={'write the source of the image'}
                                onChangeText= {(content)=> setImageCopyRight(content)}//setting up imageCopyright
                                />
                            </View>
                            {
                                windowWidth<=600 &&
                                <ImageSelector/>
                            }
                            {/* displays the text paragraphs and images */}
                            <ScrollView horizontal>
                                {selectedImages.map((image, index) => (
                                    <View>
                                        <Image key={index} source={{ uri:image.assets[0].uri }} style={{ width: 100, height: 100, marginRight: 10 }} />
                                        <TouchableOpacity
                                            style={newMultipleStyle.btn}
                                            onPress={() => deleteImage(index)}
                                        >
                                            <Text style={newMultipleStyle.btnText}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </ScrollView>
                            {content.map((item, index) => {
                                if (item.type === 'paragraph') {
                                    return (
                                    <FormInput
                                        key={index}
                                        title={`Section ${index + 1}:`}
                                        lineNum={windowWidth> 600? 8: 10}
                                        label={item.text}
                                        placeholder={`Write Section ${index + 1} here`}
                                        onChangeText={(text) => handleParagraphChange(index, text)}
                                    />
                                    );
                                }
                                })
                            }
                            {
                                windowWidth<600&&
                                <TouchableOpacity
                                onPress={handleAddParagraph}
                                style={newMultipleStyle.btn}
                                >
                                    <Text style={newMultipleStyle.btnText}>Add Section</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        {/* Component for preview and discard sections */}
                        {windowWidth>600 && <View style={newMultipleStyle.otherWrapper}>
                            {/* button that validates and navigates for the outcome preview */}
                            <TouchableOpacity
                            style={newMultipleStyle.btn}
                            onPress={
                                ()=>{
                                    if(title!==''&& content!==''&& imageCopyRight!=='' && file!==null){
                                        navigation.navigate('Preview',
                                        {
                                            title:title,content: content,
                                            imageCopyRight:imageCopyRight,file: file,selectedImages: selectedImages
                                        })
                                    }
                                    else{
                                        alert('Add all Entries')
                                    }
                                }
                            }
                                >
                                <Text style={newMultipleStyle.btnText}>Preview</Text>
                            </TouchableOpacity>
                            {/* button to discard the post */}
                            {/* component to handle upload of the multiple content images */}
                            <ImageSelector/>
                            {/* button to add paragraph */}
                            <TouchableOpacity
                            onPress={handleAddParagraph}
                            style={newMultipleStyle.btn}
                            >
                                <Text style={newMultipleStyle.btnText}>Add Section</Text>
                            </TouchableOpacity>
                            <View>
                                {/* component to handle upload of main main Landing Image */}
                                <label htmlFor="file-input" style={newMultipleStyle.uploadButton}>
                                    Select Landing Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="file-input"
                                    style={newMultipleStyle.input}
                                    onChange={(event)=> handleFileChange(event,true)}
                                />
                                {/* displays the main Image for preview */}
                                {file &&
                                <Image source={{ uri: URL.createObjectURL(file) }} style={{ width: 200, height: 200 }} />}
                                <TouchableOpacity onPress={() => setFile(null)}>
                                    <Text style={newMultipleStyle.btnText}>Clear</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                            style={newMultipleStyle.btn}
                            onPress={deleteStory}
                            >
                                <Text style={newMultipleStyle.btnText}>Discard</Text>
                            </TouchableOpacity>
                        </View>}
                    </View>
                    <BottomSide/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default NewPostMultiple