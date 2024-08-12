const Texts = require("../schema/textsSchema")
const mongoose = require('mongoose')
require("dotenv").config()
const jwt = require('jsonwebtoken')
const User = require('../schema/userProfile')
import { put } from '@vercel/blob';

const GetAllText = async (req, res) => {
    const workouts = await Texts.find({}).sort({ createdAt: -1 })
    res.status(200).json(workouts)
}

const GetOneText = async (req, res) => {
    const { id } = req.params
    const workouts = await Texts.findOne({_id:id}).sort({ createdAt: -1 })
    res.status(200).json(workouts)
}
const CreateText = async (req, res) => {
    const { Text, likes, comments,retweet } = req.body
    const { authorization } = req.headers

    const token = authorization.split(" ")[1]
    // console.log()
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
    try {
        const photo = req.file?.filename
        const userId = req.user._id
        // const result = await put(photo, req.file, 
        //     { access: 'public', 
        //     token : process.env.BLOB_READ_WRITE_TOKEN,
        //     addRandomSuffix: false,
        //   },); 
        const texts = await Texts.create({ Text, photo,retweet, likes, comments,idText:userId})
        res.status(200).json(texts)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}
const updateLikes = async (req, res) => {
    const { id } = req.params
// console.log(id)
const { authorization } = req.headers
const token = authorization.split(" ")[1]
const { _id } = jwt.verify(token, process.env.KEY)
    req.user = await User.findOne({_id}).select("_id")
    try {
        const userId = req.user._id
        // console.log(userId)
        let texts = await Texts.findByIdAndUpdate({ _id: id }, { $push: { likes: userId } },{
            ...req.body
        })
        const workouts = await Texts.find({}).sort({ createdAt: -1 })
        res.status(200).json(texts)
        
    }
    catch {
        res.status(400).json({error: error.message})
        
    }

}
const DeleteLike = async (req, res) => {
    const { id } = req.params
    // console.log(id)
    const { authorization } = req.headers
    
    const token = authorization.split(" ")[1]
    
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
        try {
            const userId = req.user._id
            // console.log(userId)
            
            let texts = await Texts.findByIdAndUpdate({ _id: id }, { $pull: { likes: userId } })
            const workouts = await Texts.find({}).sort({ createdAt: -1 })
            res.status(200).json(workouts)
            
        }
        catch {
            res.status(400).json({error: error.message})
            
        }
}
const updateReTweet = async (req, res) => {
    const { id } = req.params

const { authorization } = req.headers

const token = authorization.split(" ")[1]

const { _id } = jwt.verify(token, process.env.KEY)
    req.user = await User.findOne({_id}).select("_id")
    try {
        const userId = req.user._id
        // console.log(userId)
        
        let texts = await Texts.findByIdAndUpdate({ _id: id }, { $push: { retweet: userId } })
        const workouts = await Texts.find({}).sort({ createdAt: -1 })
        res.status(200).json(workouts)
        
    }
    catch {
        res.status(400).json({error: error.message})
        
    }

}
const updateQouteReTweet = async (req, res) => {
    const { retweetQouteText} = req.body
    const { id,idRetweet } = req.params

const { authorization } = req.headers

const token = authorization.split(" ")[1]

const { _id } = jwt.verify(token, process.env.KEY)
    req.user = await User.findOne({_id}).select("_id")
    try {
        const userId = req.user._id
        // console.log(userId)
        const photo = req.file?.filename
        let texts = await Texts.findByIdAndUpdate({ _id: id }, { $push: { QouteTweet: idRetweet } })
        const workouts = await Texts.find({}).sort({ createdAt: -1 })
        res.status(200).json(workouts)
        
    }
    catch {
        res.status(400).json({error: error.message})
        
    }

}
const DeleteQouteReTweet = async (req, res) => {
    const { id } = req.params
    console.log(id)
    const { authorization } = req.headers
    
    const token = authorization.split(" ")[1]
    
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
        try {
            const userId = req.user._id
            // console.log(userId)
            const qouteRetweet = await Texts.findOne({_id:id}).sort({ createdAt: -1 })
            console.log(qouteRetweet.retweet.map((res=>res._id)))
            let texts = await Texts.findByIdAndUpdate({ _id: id },{
                $pull: {
                    QouteTweet: {
                        _id: qouteRetweet.retweet.map((res=>res._id)),
                        qouteRetweet: qouteRetweet.retweet.map((res=>res.qouteRetweet)),
                        photo: qouteRetweet.retweet.map((res=>res.photo)),
                        idOfTheText: userId,
            }}})
            const workouts = await Texts.find({}).sort({ createdAt: -1 })
            res.status(200).json( workouts)
            
        }
        catch {
            res.status(400).json({error: error.message})
            
        }
}
const DeleteReTweet = async (req, res) => {
    const { id } = req.params
    console.log(id)
    const { authorization } = req.headers
    
    const token = authorization.split(" ")[1]
    
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
        try {
            const userId = req.user._id
            // console.log(userId)
            
            let texts = await Texts.findByIdAndUpdate({ _id: id }, { $pull: { retweet: userId } })
            const workouts = await Texts.find({}).sort({ createdAt: -1 })
            res.status(200).json( workouts)
            
        }
        catch {
            res.status(400).json({error: error.message})
            
        }
}
const GetOneAndUpdate = async (req, res) => {
    const { id } = req.params
    const texts = await Text.findById({ id })
    res.status(200).json(texts)
}
const GetOneAndDelete = async (req, res) => {
    const { id } = req.params
    const texts = await Text.findOneAndDelete({ _id:id })
    res.status(200).json(texts)
    
}
const updatecomments = async (req, res) => {
    const { retweetComments} = req.body
    const { id,idComment } = req.params
const { authorization } = req.headers

const token = authorization.split(" ")[1]

const { _id } = jwt.verify(token, process.env.KEY)
    req.user = await User.findOne({_id}).select("_id")
    try {
        const userId = req.user._id
        // console.log(userId)
       
        const photo = req.file?.filename
        let texts = await Texts.findByIdAndUpdate({ _id: id }, { $push: { comments: idComment } })
        const workouts = await Texts.find({}).sort({ createdAt: -1 })
        res.status(200).json(workouts)
        
    }
    catch {
        res.status(400).json({error: error.message})
        
    }

}
const getReply= async (req, res) => {
    const { id } = req.params
    const GetText = await Texts.findOne({ _id: id }).sort({ createdAt: -1 })
    // const GetReplies = await replyingComments.findOne({ _id: id }).sort({ createdAt: -1 })
    // console.log()
    res.status(200).json(GetText)
}
const deletePost =  async (req,res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Not Found' })
        
    }
    console.log(id)
    const workout = await Texts.findOneAndDelete({ _id: id })
    await User.updateMany({}, { $pull: { retweet: id } });
    await User.updateMany({}, { $pull: { QouteTweet: id } });
    await User.updateMany({}, { $pull: { myLikes: id } });
    await User.updateMany({}, { $pull: { comments: id } });
    await User.updateMany({}, { $pull: { idText: id } });
    if (!workout) {
        return res.status(404).json({ error: 'Not Found' })
    }
    res.status(200).json(workout)
    
    
}
module.exports = {
    GetOneAndUpdate, GetOneAndDelete, CreateText, GetAllText, updateLikes, DeleteLike, updateReTweet,
    DeleteReTweet,GetOneText,updateQouteReTweet,DeleteQouteReTweet,updatecomments,getReply,getReply,deletePost
    
}