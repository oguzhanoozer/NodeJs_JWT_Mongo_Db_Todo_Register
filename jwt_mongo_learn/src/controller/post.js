const post = require("../model/post.js")

const createPost = async(req,res)=>{
    try{
        
        const newPost = await post.create(req.body)
        res.status(201).json({
            newPost
        })

    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const getPost = async(req,res)=>{
    try{
        const getPosts = await post.find()
        res.status(201).json({
            getPosts
        })

    }catch(error){
        return res.status(500).json({message:error.message})
    }
}


const getPostDetail = async(req,res)=>{
    try{
        const {id} = req.params
        const postDetail = await post.findById(id)
        res.status(201).json({
            postDetail
        })

    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const getPostUpdate = async(req,res)=>{
    try{
        const {id} = req.params
        const updatePost = await post.findByIdAndUpdate(id,req.body,{new:true})
        res.status(201).json({
            updatePost
        })

    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const deletePost = async(req,res)=>{
    try{
        const {id} = req.params
        await post.findByIdAndRemove(id)
        res.status(201).json({
            "message":"The post was removed"
        })

    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const searchPost = async(req,res)=>{
    const {search,tag} = req.query
    try{
        const title = new RegExp(search,"i")
        const posts = await post.find({$or:[{title}],tag : {$in:tag.split(",")}})
        res.status(201).json({
            posts
        })

    }catch(error){
        return res.status(500).json({message:error.message})
    }
}


module.exports = {getPost,createPost,getPostDetail,getPostUpdate,deletePost,searchPost}