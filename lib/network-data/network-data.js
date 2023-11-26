

export const fetchAllBlogs = ()=>{
    fetch('http://backend.yetublog.com/').then((response)=>{
        // console.log('response',response)
        return response.json()
    }).catch((err)=>{
        console.log('response', err)
    })
}

export const fetchLatestBlog = ()=>{
    axios.get("https://backend.yetublog.com/latest_blog/")
        .then((response)=>{
            return JSON.stringify(response.data, null, 2)
        })
        .catch((err)=> alert(err))
}
export const fetchLatestBlogs = ()=>{
    fetch('http://backend.yetublog.com/latest_blogs/').then((response)=>{
        return response.json()
    }).catch((err)=>{
        console.log('Error',err)
    })
}