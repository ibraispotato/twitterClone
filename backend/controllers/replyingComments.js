const replyingComments = require("../schema/replyingCommentsSchema")
const Comments = require("../schema/textsSchema")
const jwt = require('jsonwebtoken')
const User = require('../schema/userProfile')
const mongoose = require('mongoose')
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  
async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    
    return res;
  }
const CreateText = async (req, res) => {
    const { retweetComments,photo } = req.body
    const { id } = req.params
    const { authorization } = req.headers
    const token = authorization.split(" ")[1]
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
    try {
        if(photo==="null"){
        const userId = req.user._id
        const texts = await replyingComments.create({ retweetComments, photo:null,idText:id,idOfTheReplyer:userId })
        res.status(200).json(texts)
        }
        else{
            const b64 = Buffer.from(req.file.buffer).toString("base64")||''
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64||''
            const cldRes = await handleUpload(dataURI)||null
            const userId = req.user._id
        const texts = await replyingComments.create({ retweetComments, photo:cldRes,idText:id,idOfTheReplyer:userId })
        res.status(200).json(texts)
        }
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getText = async (req, res) => {
    const { id } = req.params
    // console.loh(id)
    const workouts = await replyingComments.findById({ _id: id }).sort({ createdAt: -1 })
    // console.log(workouts)
    res.status(200).json(workouts)

}
const updateLikes = async (req, res) => {
    const { id } = req.params
console.log(id)
const { authorization } = req.headers

const token = authorization.split(" ")[1]

const { _id } = jwt.verify(token, process.env.KEY)
    req.user = await User.findOne({_id}).select("_id")
    try {
        const userId = req.user._id
        // console.log(userId)
        
        let texts = await replyingComments.findByIdAndUpdate({ _id: id }, { $push: { likes: userId } })
        const workouts = await replyingComments.find({}).sort({ createdAt: -1 })
        res.status(200).json(workouts)
        
    }
    catch {
        res.status(400).json({error: error.message})
        
    }

}
const DeleteLike = async (req, res) => {
    const { id } = req.params
    console.log(id)
    const { authorization } = req.headers
    
    const token = authorization.split(" ")[1]
    
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
        try {
            const userId = req.user._id
            // console.log(userId)
            
            let texts = await replyingComments.findByIdAndUpdate({ _id: id }, { $pull: { likes: userId } })
            const workouts = await replyingComments.find({}).sort({ createdAt: -1 })
            res.status(200).json( workouts)
            
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
        
        let texts = await replyingComments.findByIdAndUpdate({ _id: id }, { $push: { retweet: userId } })
        const workouts = await replyingComments.find({}).sort({ createdAt: -1 })
        res.status(200).json(workouts)
        
    }
    catch {
        res.status(400).json({error: error.message})
        
    }

}
const updateQouteReTweet = async (req, res) => {
    const { retweetQouteText} = req.body
    const { id,idRetweet } = req.params
// console.log(retweetQouteText)
const { authorization } = req.headers

const token = authorization.split(" ")[1]

const { _id } = jwt.verify(token, process.env.KEY)
    req.user = await User.findOne({_id}).select("_id")
    try {
        const userId = req.user._id
        // console.log(userId)
        const photo = req.file?.filename
        let texts = await replyingComments.findByIdAndUpdate({ _id: id }, { $push: { QouteTweet: idRetweet } })
        const workouts = await replyingComments.find({}).sort({ createdAt: -1 })
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
            let texts = await replyingComments.findByIdAndUpdate({ _id: id },{
                $pull: {
                    QouteTweet: {
                        _id: qouteRetweet.retweet.map((res=>res._id)),
                        qouteRetweet: qouteRetweet.retweet.map((res=>res.qouteRetweet)),
                        photo: qouteRetweet.retweet.map((res=>res.photo)),
                        idOfTheText: userId,
            }}})
            // const workouts = await replyingComments.find({}).sort({ createdAt: -1 })
            // res.status(200).json( workouts)
            
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
            
            let texts = await replyingComments.findByIdAndUpdate({ _id: id }, { $pull: { retweet: userId } })
            const workouts = await replyingComments.find({}).sort({ createdAt: -1 })
            res.status(200).json( workouts)
            
        }
        catch {
            res.status(400).json({error: error.message})
            
        }
}

const updatecomments = async (req, res) => {
        const { retweetComments } = req.body
        const { id ,idComment} = req.params
        const { authorization } = req.headers
    console.log("id"+id)
        const token = authorization.split(" ")[1]
        
        const { _id } = jwt.verify(token, process.env.KEY)
            req.user = await User.findOne({_id}).select("_id")
        try {
            const userId = req.user._id
            const photo = req.file?.filename
            const text= await replyingComments.findByIdAndUpdate({_id:id},{$push:{ comments:idComment}})
            
        }
        catch (error) {
            res.status(400).json({error: error.message})
        }
    }
    const DeleteReply = async (req,res) => {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Not Found' })
            
        }
        const getPost = await replyingComments.findOne({_id:id}).sort({ createdAt: -1 })
    async function deleteImage(publicId) {
        try {
          const result = await cloudinary.uploader.destroy(publicId);
          console.log('Delete result:', result);
        } catch (error) {
          console.error('Error deleting image:', error);
        }
      }
      deleteImage(getPost.photo?.map((res) => res.public_id)[0])
        const workout = await replyingComments.findOneAndDelete({ _id: id })
        await User.updateMany({}, { $pull: { retweet: id } });
        await Comments.updateMany({}, { $pull: { comments: id } });
        await Comments.updateMany({}, { $pull: { idText: id } });
        await Comments.updateMany({}, { $pull: { likes: id } });
        await Comments.updateMany({}, { $pull: { QouteTweet: id } });
        await Comments.updateMany({}, { $pull: { retweet: id } });
        await replyingComments.updateMany({}, { $pull: { retweet: id } });
        await replyingComments.updateMany({}, { $pull: { QouteTweet: id } });
        await replyingComments.updateMany({}, { $pull: { likes: id } });
        await replyingComments.updateMany({}, { $pull: { idText: id } });
        await replyingComments.updateMany({}, { $pull: { idOfTheReplyer: id } });
        await replyingComments.updateMany({}, { $pull: { comments: id } });
        await User.updateMany({}, { $pull: { QouteTweet: id } });
        await User.updateMany({}, { $pull: { likes: id } });
        await User.updateMany({}, { $pull: { comments: id } });
        await User.updateMany({}, { $pull: { idText: id } });
        if (!workout) {
            return res.status(404).json({ error: 'Not Found' })
        }
        res.status(200).json(workout)
        
    }
module.exports = {
    CreateText, getText,updateLikes, updateLikes, DeleteLike, updateReTweet, updateQouteReTweet, DeleteReTweet,DeleteQouteReTweet,
    updatecomments,DeleteReply
}