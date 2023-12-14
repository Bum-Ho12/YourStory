import React,{useState} from 'react'
import { SafeAreaView,View, Text,TouchableOpacity,Image, ScrollView} from 'react-native'
import FormInput from '../components/formInput'
import BottomSide from '../components/bottom-side'
import { NewMultipleStyle } from '../utils/app-styles'
import * as ImagePicker from 'expo-image-picker'
import { windowWidth } from '../utils/dimensions'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '../utils/state-context'
import blogGenerator from '../utils/blob-generator'
import FormData from 'form-data'



const NewPostMultiple=({navigation})=>{
    const {darkTheme} = useTheme()
    const dat = new FormData()
    //initializing the styles
    const newMultipleStyle = NewMultipleStyle()
    // data to upload to post api endpoint
    const [title, setTitle] = useState('')
    const [file, setFile] = useState(null)
    const [content, setContent] = useState([]) // Initial empty paragraph
    // const [selectedImages, setSelectedImages] = useState([])
    const [imageCopyRight,setImageCopyRight] = useState('')

    //add paragraph to contents
    const handleAddParagraph=()=>{
        const newIndex = content.length * 10 +10
        setContent([...content,{type:'paragraph',text:'',index: newIndex}])
    }
    //handling changes in paragraphs
    const handleParagraphChange =(index,text)=>{
        const updatedContent = [...content]
        updatedContent[index].text = text
    }

    //adds main image
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
            const newIndex = content.length * 10 + 20
            //blobGenerator is a method to generate blob and filename
            const genAnswer = await blogGenerator({imageContent:result,newIndex:newIndex})
            const {blob,filename} = genAnswer
            setContent([...content,
                {...result,type:'image',index:newIndex,'blob': blob,'filename': filename}
            ])
        }
    }

    const deleteImage = (index) => {
        const newContent = [...content]
        newContent.splice(index, 1)
        setContent(newContent)
    }

    const deleteStory=()=>{
        setContent([{ type: 'paragraph', text: '' }]),
        setFile(null)
        setTitle('')
        setImageCopyRight('')
        navigation.navigate('MyBlogs')
    }

    const uploadImage=async()=>{
        const { data, error } = await supabase
        .storage.from('image-stories')
        .upload(file.filename, file.assets[0].uri)

        if (error) {
            console.error('Upload error:', error.message)
        }else{
            console.log(data)
        }
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
                                            imageCopyRight:imageCopyRight,file: file
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
                                    {/* displays the main Image for preview */}
                                    {file &&
                                    <View>
                                        <Image source={{ uri: URL.createObjectURL(file) }} style={{ width: 200, height: 200 }} />
                                        <TouchableOpacity onPress={() => setFile(null)} style={{ marginTop:10 }} >
                                            <Text style={newMultipleStyle.btnText}>Clear</Text>
                                        </TouchableOpacity>
                                    </View>
                                    }
                                {/* component to handle upload of main main Landing Image */}
                                {!file ?<label htmlFor="file-input" style={newMultipleStyle.uploadButton}>
                                    Select Landing Image
                                </label>:<label htmlFor="file-input" style={newMultipleStyle.uploadButton}>
                                    Replace
                                </label>
                                }
                                <input
                                        type="file"
                                        accept="image/*"
                                        id="file-input"
                                        style={newMultipleStyle.input}
                                        onChange={(event)=> handleFileChange(event,true)}
                                    />
                            {/* first part of the content */}
                            <TouchableOpacity onPress={uploadImage}>
                                <Text>Upload Image</Text>
                            </TouchableOpacity>
                            <View>
                                <FormInput
                                title={'Image copy-Right:'}
                                lineNum={windowWidth> 600?1:2}
                                label={imageCopyRight}// imageCopyright data viewing
                                placeholder={'write the source of the image'}
                                onChangeText= {(content)=> setImageCopyRight(content)}//setting up imageCopyright
                                />
                            </View>
                            {/* list of images */}
                            {
                                content.map((item,index)=>{
                                    if(item.type ==='paragraph'){
                                        return(
                                            <FormInput
                                                key={index}
                                                title={`Section ${Math.floor(item.index/10)+1}: `}
                                                lineNum={windowWidth>600?8:10}
                                                placeholder={`Write Section here`}
                                                onChangeText = {(text)=> handleParagraphChange(index,text)}
                                            />
                                        )
                                    } else if (item.type === 'image'){
                                        return(
                                            <View key={index}>
                                                <Image source={{ uri:item.assets[0].uri }}
                                                style={{ width:100,height: 100,marginRight:10 }}
                                                />
                                                <TouchableOpacity
                                                style={newMultipleStyle.btn}
                                                onPress={()=>deleteImage(item.index)}
                                                >
                                                    <Text style={newMultipleStyle.btnText} >
                                                        Delete
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    }
                                })
                            }
                            {/* button to add paragraph or image*/}
                            <View style={newMultipleStyle.addContent} >
                                {/* button to add paragraph */}
                                    <TouchableOpacity
                                        onPress={handleAddParagraph}
                                        style={newMultipleStyle.btnAdd}
                                    >
                                        <Ionicons name="md-pencil-outline" size={24} color={darkTheme?'#ffffff': '#121212'} />
                                        <Text style={newMultipleStyle.btnTextAdd}>Write</Text>
                                    </TouchableOpacity>
                                    {/* component to handle upload of the multiple content images */}
                                    <TouchableOpacity
                                        onPress={selectImages}
                                        style={newMultipleStyle.btnAdd}
                                    >
                                        <Ionicons name="image-outline" size={24} color={darkTheme?'#ffffff': '#121212'} />
                                        <Text style={newMultipleStyle.btnTextAdd} >Select Image</Text>
                                    </TouchableOpacity>
                            </View>
                        </View>
                        {/* Component for preview and discard sections */}
                        {windowWidth>600 && <View style={newMultipleStyle.otherWrapper}>
                            {/* button that validates and navigates for the outcome preview */}
                            <TouchableOpacity
                            style={newMultipleStyle.btn}
                            onPress={
                                async()=>{
                                    if(title!==''&& content!==''&& imageCopyRight!=='' && file!==null){
                                        navigation.navigate('Preview',
                                        {
                                            title:title,content: content,
                                            imageCopyRight:imageCopyRight,file: file
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