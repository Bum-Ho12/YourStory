import FormData from "form-data"
import { baseUrl } from '../utils/urls'
import { useTheme } from '../utils/state-context'

const dataHandler= ({title,content,imageCopyRight,file})=>{
    const data = new FormData()
    data.append('title',title)
    data.append('frontImage',file)
    data.append('imageCopyRight',imageCopyRight)
    content.map(async(section)=>{
        if(section.type==='paragraph'){
            data.append('story',section.text)
        }else if(section.type ==='image'){
            data.append('contentImages',section.url)
        }
    })
    alert()
    return data
}

export default dataHandler