const User = require('../schema/userProfile')
const Text = require('../schema/textsSchema')
const Texts = require("../schema/textsSchema")

const replyingComments = require("../schema/replyingCommentsSchema")
const Comments = require("../schema/textsSchema.js")
const mongoose = require('mongoose')

require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const CreateToken = (_id) => {
        return jwt.sign({_id},process.env.KEY,{expiresIn:"30d"})
}
const Get = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(200).json({ error: 'Not Found' })
        
    }
    const workout = await User.find({_id:id}).sort({ createdAt: -1 })
    if (!workout) {
        return res.status(200).json({ error: 'Not Found' })
    }
    res.status(200).json(workout)
    
    // console.log(workouts)
    
}
const GetAllUsers = async (req, res) => {
    const { id } = req.params
    
    const workouts = await User.find({}).sort({ createdAt: -1 })
    // console.log(workouts)
    res.status(200).json(workouts)
}
const GetBYName = async (req, res) => {
    const { names } = req.body
    // console.log(name)
    // const getuser = await User.find({})
    // const name = getuser
    // const o = name[1]?.name.split("")
    // console.log(o)
    const getUserByName = await User.getUser({ name: { $regex: names } })
    res.status(200).json(getUserByName)
}
const GetBYName2= async (req, res) => {
    const { names } = req.params
    // console.log(name)
    // const getuser = await User.find({})
    // const name = getuser
    // const o = name[1]?.name.split("")
    // console.log(o)
    const getUserByName = await User.getUser({ name: { $regex: names } })
    res.status(200).json(getUserByName)
}
const signUpUser = async (req,res) => {
    const { name, userName,photo, email, password,bio } = req.body
    // console.log(req.file)
    // console.log(name, userName,photo, email, password,bio)
    try {
        // const photo = req.file.filename||null
        const user = await User.signup(name, userName,photo, email, password,bio)
        
        const token = CreateToken(user._id)
        const admin = user.isAdmin
        const myLikes = user.myLikes
        const myRetweet = user.myRetweet
        const myComments = user.myComments
        const myQouteRetweet = user.myQouteRetweet
        const idOfThePost = user.idOfThePost
        const id = user._id
        res.status(200).json({name, userName, photo, email,bio, token, admin,_id:id,myLikes,myRetweet,myComments,myQouteRetweet,idOfThePost })
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}
const loginUser = async (req,res) => {
    const {email, password } = req.body
    
    try {
        const user = await User.login(email, password)
        const token = CreateToken(user._id)
        // console.log(user)
        const userName = user.userName
        const name = user.name
        const photo = user.photo
        const admin = user.isAdmin
        const joinAt = user.createdAt
        const bio = user.bio
        const myRetweet = user.myRetweet
        const myLikes = user.myLikes
        const myComments = user.myComments
        const myQouteRetweet = user.myQouteRetweet
        const idOfThePost = user.idOfThePost
        res.status(200).json({_id:user._id, name, userName, photo, email, token,admin,bio,myRetweet,idOfThePost,myLikes,myComments,myQouteRetweet })
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}
const CheckPassword = async (req, res) => {
    const { password } = req.body
    console.log(password)
    try {
    // console.log(password)

         await User.Auth(password)

        return res.json({status:true,message:"update"})

        // console.log(password)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}
const updateUserName = async (req, res) => {
    const { userName } = req.body
    // const user = await User.userName(userName)
    const { tokens } = req.params


// console.log(token)
  try {
    //   console.log(userName)
      const dec = jwt.verify(tokens, process.env.KEY)
      const idDec = dec._id
      const token = CreateToken(User._id)
    await User.userName(userName)
        
            let texts= await User.findOneAndUpdate({ _id: idDec }, {userName})
            // res.status(200).json({all})
            res.status(200).json({texts,token})
        
    }
    catch (error) {
        res.status(400).json({ message: error.message})
     
    }
}
const updateEmail = async (req, res) => {
    const { email,password } = req.body
    // const user = await User.userName(userName)
    const { tokens } = req.params
    try {
        const dec = jwt.verify(tokens, process.env.KEY)
        // console.log(dec)
        const idDec = dec._id
        const token = CreateToken(User._id)
        await User.Email(email,password)
        // console.log(password)
        let text = await User.findOneAndUpdate({ _id: idDec }, { email })
        // res.status(200).json({all})
        res.status(200).json({ text,token })
        
    }
    catch (error) {
        res.status(400).json({ message: error.message })
     
    
    }
}
const updatePassword = async (req, res) => {
    const { checkPassword,password,secPassword } = req.body
    // const user = await User.userName(userName)
    const { token } = req.params
    try {
        const dec = jwt.verify(token, process.env.KEY)
        const idDec = dec._id
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        await User.findByIdAndUpdate({ _id: idDec }, { password: hash })
        return res.json({status:true,message:"update"})
        
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}
const getUsers = async (req, res) => {
    const {id} = req.params
    const text = await User.findById(id)
    res.status(200).json( text )
}
const getUser = async (req, res) => {
    const {id} = req.params
    const text = await User.findById(id)
    // conse
    const token = CreateToken(text?._id)
    
    // console.log(token)
    res.status(200).json({_id: text._id, name: text.name, userName: text.userName,
        photo: text.photo, email: text.email, token, admin: text.isAdmin, bio: text.bio, myRetweet: text.myRetweet,
        myLikes: text.myLikes, myQouteRetweet: text.myQouteRetweet, myComments: text.myComments, follwoing: text.follwoing,
        followers: text.followers,idOfThePost: text.idOfThePost})
}
const forgotpassword = async (req, res)=>{
    const { email } = req.body
    try {
        const user = await User.forgotpassword(email)
        const token = jwt.sign({ _id: user._id }, process.env.KEY, { expiresIn: "5m" })
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'ibrapotato@gmail.com',
            pass: 'qbdn uhgd nlec yuds'
            }
          });
          
          var mailOptions = {
            from: 'ibrapotato@gmail.com',
            to: email,
            subject: 'Reset your password',
            text: `http://localhost:3000/user/reset/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}
const resetPass = async (req,res) => {
    const { password } = req.body
    const { token } = req.params
    try {
        const dec = jwt.verify(token, process.env.KEY)
        const idDec = dec._id
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        await User.findByIdAndUpdate({ _id: idDec }, { password: hash })
        return res.json({status:true,message:"update"})
        
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}
const updateUser = async (req,res) => {
    const { name, bio } = req.body
    // const { photo } = req.file.filename
    const { id } = req.params
    try {
        
        const photo = req.file?.filename
        // const photos = photo.filename
        console.log(photo)
            let text= await User.findOneAndUpdate({ _id: id }, {name,photo,bio})
            // res.status(200).json({all})
            res.status(200).json({text})
        
    }
    catch (error) {
        res.status(400).json({ message: error.message})
     
    }
}

const updatePasswordManually = async (req, res) => {
    const { checkPassword, password, secPassword } = req.body
    // console.log(checkPassword)
    const { tokens } = req.params
    // console.log(tokens)
    try {
        const dec = jwt.verify(tokens, process.env.KEY)
        console.log(dec)
        const idDec = dec._id
        const token = CreateToken(User._id)
            await User.UpdatePassword(checkPassword, password, secPassword)
          
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, salt)
            
            
            
            let text = await User.findByIdAndUpdate({ _id: idDec }, { password: hash })
        res.status(200).json({ text,token })
            
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    
   
}
const updateMyLikes = async (req, res) => {
    const { id } = req.params
console.log(id)
const { authorization } = req.headers

const token = authorization.split(" ")[1]

const { _id } = jwt.verify(token, process.env.KEY)
    req.user = await User.findOne({_id}).select("_id")
    try {
        const userId = req.user._id
        // console.log(userId)
        
        const text= await User.findByIdAndUpdate({ _id: userId }, { $push: { myLikes: id } })
        const account = await User.findById({ _id: id }).sort({ createdAt: -1 })
        // console.log(account)
        res.status(200).json(account)
        
        
    }
    catch {
        res.status(400).json({error: error.message})
        
    }

}
const DeleteMyLike = async (req, res) => {
    const { id } = req.params
    // console.log(id)
    const { authorization } = req.headers
    
    const token = authorization.split(" ")[1]
    
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
        try {
            const userId = req.user._id
            // console.log(userId)
            
            const text= await User.findByIdAndUpdate({ _id: userId }, { $pull: { myLikes: id } })
            const account = await User.findById({_id:id}).sort({ createdAt: -1 })
            res.status(200).json(account)
            
        }
        catch {
            res.status(400).json({error: error.message})
            
        }
}
const updateMyTweet = async (req, res) => {
    const { id } = req.params
console.log(id)
const { authorization } = req.headers

const token = authorization.split(" ")[1]

const { _id } = jwt.verify(token, process.env.KEY)
    req.user = await User.findOne({_id}).select("_id")
    try {
        const userId = req.user._id
        // console.log(userId)
        
        const text= await User.findByIdAndUpdate({ _id: userId }, { $push: { myRetweet: id } })
        const account = await User.findOne({_id:id}).sort({ createdAt: -1 })
            res.status(200).json(account)
            
        
        
    }
    catch {
        res.status(400).json({error: error.message})
        
    }

}
const updatePosts = async (req, res) => {
    const { id } = req.params
// console.log(id)
const { authorization } = req.headers

const token = authorization.split(" ")[1]

const { _id } = jwt.verify(token, process.env.KEY)
    req.user = await User.findOne({_id}).select("_id")
    try {
        const userId = req.user._id
        // console.log(userId)
        
        const text= await User.findByIdAndUpdate({ _id: userId }, { $push: { idOfThePost: id } })
        const account = await User.findOne({_id:id}).sort({ createdAt: -1 })
            res.status(200).json(account)
            
        
        
    }
    catch {
        res.status(400).json({error: error.message})
        
    }

}
const DeleteMyTweet = async (req, res) => {
    const { id } = req.params
    const { authorization } = req.headers
    
    const token = authorization.split(" ")[1]
    
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
        try {
            const userId = req.user._id
            // console.log(userId)
            
            const text= await User.findByIdAndUpdate({ _id: userId }, { $pull: { myRetweet: id } })
            const account = await User.findOne({_id:id}).sort({ createdAt: -1 })
            res.status(200).json(account)
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
            
        }
        catch {
            res.status(400).json({error: error.message})
            
        }
}
const DeleteText = async (req,res) => {
    const { id } = req.params
    // console.log(id)
    const { authorization } = req.headers
    
    const token = authorization.split(" ")[1]
    
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
        try {
            const userId = req.user._id
    await Text.findOneAndDelete({ _id: id })
    // await Text.updateMany({}, { $pull: { comments: id } });
    // await Text.updateMany({}, { $pull: { idText: id } });
    // await Text.updateMany({}, { $pull: { likes: id } });
    // await Text.updateMany({}, { $pull: { QouteTweet: id } });
    // await Text.updateMany({}, { $pull: { retweet: id } });

    await replyingComments.findOneAndDelete({ _id: id })
    // await replyingComments.updateMany({}, { $pull: { retweet: id } });
    // await replyingComments.updateMany({}, { $pull: { QouteTweet: id } });
    // await replyingComments.updateMany({}, { $pull: { likes: id } });
    // await replyingComments.updateMany({}, { $pull: { idText: id } });
    // await replyingComments.updateMany({}, { $pull: { idOfTheReplyer: id } });
    // await replyingComments.updateMany({}, { $pull: { comments: id } });

    // await User.updateMany({}, { $pull: { myRetweet: id } });
    // await User.updateMany({}, { $pull: { QouteTweet: id } });
    // await User.updateMany({}, { $pull: { myLikes: id } });
    // await User.updateMany({}, { $pull: { myComments: id } });
    // await User.updateMany({}, { $pull: { idOfThePost: id } });
    // await User.updateMany({}, { $pull: { follwoing: id } });
    // await User.updateMany({}, { $pull: { followers: id } });
    
    const account = await User.findOne({_id:userId}).sort({ createdAt: -1 })
    res.status(200).json(account)
}
catch {
    res.status(400).json({error: error.message})
    
}
}
const deleteLikes = async (req,res) => {
    const { id } = req.params

    // console.log(id)
    const { authorization } = req.headers
    
    const token = authorization.split(" ")[1]
    
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
        try {
            const userId = req.user._id

    await Text.updateMany({}, { $pull: { likes: userId } });
    await replyingComments.updateMany({}, { $pull: { likes: userId } });
    await User.updateMany({}, { $pull: { myLikes: id } });
    const account = await User.findOne({_id:userId}).sort({ createdAt: -1 })
    res.status(200).json(account)
}
catch {
    res.status(400).json({error: error.message})
    
}
}
const deleteComments = async (req,res) => {
    const { id } = req.params

    // console.log(id)
    const { authorization } = req.headers
    
    const token = authorization.split(" ")[1]
    
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
        try {
            const userId = req.user._id
    await Text.updateMany({}, { $pull: { comments: id } });
    await replyingComments.updateMany({}, { $pull: { comments: id } });
    await User.updateMany({}, { $pull: { myComments: id } });
    const account = await User.findOne({_id:userId}).sort({ createdAt: -1 })
    res.status(200).json(account)
}
catch {
    res.status(400).json({error: error.message})
    
}
}
const deleteTweet = async (req,res) => {
    const { id } = req.params

    // console.log(id)
    const { authorization } = req.headers
    
    const token = authorization.split(" ")[1]
    
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
        try {
            const userId = req.user._id
    await Text.updateMany({}, { $pull: { retweet: userId } });
    await replyingComments.updateMany({}, { $pull: { retweet: userId } });
    await User.updateMany({}, { $pull: { myRetweet: id } });
    const account = await User.findOne({_id:userId}).sort({ createdAt: -1 })
    res.status(200).json(account)
}
catch {
    res.status(400).json({error: error.message})
    
}
}
const deleteidOfTheReplier = async (req,res) => {
    const { id } = req.params

    // console.log(id)
    const { authorization } = req.headers
    
    const token = authorization.split(" ")[1]
    
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
        try {
            const userId = req.user._id
    await replyingComments.updateMany({}, { $pull: { idOfTheReplyer: userId } });
    await User.updateMany({}, { $pull: { myComments: id } });
    const account = await User.findOne({_id:userId}).sort({ createdAt: -1 })
    res.status(200).json(account)
}
catch {
    res.status(400).json({error: error.message})
    
}
}
const deleteIdText = async (req,res) => {
    const { id } = req.params

    // console.log(id)
    const { authorization } = req.headers
    
    const token = authorization.split(" ")[1]
    
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
        try {
            const userId = req.user._id
    await Text.findOneAndDelete({_id:id});
    await Text.updateMany({}, { $pull: { idText: userId } });
    // await replyingComments.updateMany({}, { $pull: { idText: id } });
    // await User.updateMany({}, { $pull: { idOfThePost: id } });
    const account = await User.findOne({_id:userId}).sort({ createdAt: -1 })
    res.status(200).json(account)
}
catch {
    res.status(400).json({error: error.message})
    
}
}
const deleteQouteTweet = async (req,res) => {
    const { id } = req.params

    // console.log(id)
    const { authorization } = req.headers
    
    const token = authorization.split(" ")[1]
    
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
        try {
            const userId = req.user._id
    await Text.updateMany({}, { $pull: { QouteTweet: id } });
    await replyingComments.findOneAndDelete({ _id: id })
    await User.updateMany({}, { $pull: { myComments: id } });
    const account = await User.findOne({_id:userId}).sort({ createdAt: -1 })
    res.status(200).json(account)
}
catch {
    res.status(400).json({error: error.message})
    
}
}
const deleteFollow = async (req,res) => {
    const { id } = req.params

    // console.log(id)
    const { authorization } = req.headers
    
    const token = authorization.split(" ")[1]
    
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
        try {
            const userId = req.user._id
    await User.updateMany({}, { $pull: { follwoing: userId } });
    await User.updateMany({}, { $pull: { followers: id } });
    const account = await User.findOne({_id:userId}).sort({ createdAt: -1 })
    res.status(200).json(account)
}
catch {
    res.status(400).json({error: error.message})
    
}
}
const DeleteUser = async (req, res) => {
    const { id } = req.params
    // console.log(id)
    const { authorization } = req.headers
    
    const token = authorization.split(" ")[1]
    
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
        try {
            const userId = req.user._id
            // console.log(userId)
            await User.findOneAndDelete({ _id: id })
                
                await Texts.updateMany({}, { $pull: { likes: userId} });
                await Text.updateMany({}, { $pull: { QouteTweet: userId } });
                await Text.updateMany({}, { $pull: { retweet: userId } });
    
                await replyingComments.findOneAndDelete({ _id: userId })
                await replyingComments.updateMany({}, { $pull: { retweet: userId } });
                await replyingComments.updateMany({}, { $pull: { QouteTweet: userId } });
                await replyingComments.updateMany({}, { $pull: { likes: userId } });
                await replyingComments.updateMany({}, { $pull: { idText: userId } });
                await replyingComments.updateMany({}, { $pull: { idOfTheReplyer: userId } });
                await replyingComments.updateMany({}, { $pull: { comments: userId } });

                await User.updateMany({}, { $pull: { myRetweet: userId } });
                await User.updateMany({}, { $pull: { myQouteRetweet: userId } });
                await User.updateMany({}, { $pull: { myLikes: userId } });
                await User.updateMany({}, { $pull: { myComments: userId } });
                await User.updateMany({}, { $pull: { idOfThePost: userId } });
                await User.updateMany({}, { $pull: { follwoing: userId } });
                await User.updateMany({}, { $pull: { followers: userId } });
                const account = await User.findOne({_id:userId}).sort({ createdAt: -1 })
            res.status(200).json(account)
            // res.status(200).json(text)
        }
        catch {
            res.status(400).json({error: error.message})
            
        }

        
        
    }
const updateMyQouteTweet = async (req, res) => {
    const { id } = req.params
console.log(id)
const { authorization } = req.headers

const token = authorization.split(" ")[1]

const { _id } = jwt.verify(token, process.env.KEY)
    req.user = await User.findOne({_id}).select("_id")
    try {
        const userId = req.user._id
        // console.log(userId)
        
        const text= await User.findByIdAndUpdate({ _id: userId }, { $push: { myQouteRetweet: id } })
        const account = await User.findOne({_id:id}).sort({ createdAt: -1 })
            res.status(200).json(account)
            
        
        
    }
    catch {
        res.status(400).json({error: error.message})
        
    }

}
const updateMyComment = async (req, res) => {
    const { id } = req.params
console.log(id)
const { authorization } = req.headers

const token = authorization.split(" ")[1]

const { _id } = jwt.verify(token, process.env.KEY)
    req.user = await User.findOne({_id}).select("_id")
    try {
        const userId = req.user._id
        console.log(userId)
        
        const text= await User.findByIdAndUpdate({ _id: userId }, { $push: { myComments: id } })
        const account = await User.findOne({ _id: id }).sort({ createdAt: -1 })
        // console.log(account)
        res.status(200).json(account)
        
        
    }
    catch {
        res.status(400).json({error: error.message})
        
    }
}
const DeleteMyQouteTweet = async (req, res) => {
    const { id } = req.params
    console.log(id)
    const { authorization } = req.headers
    
    const token = authorization.split(" ")[1]
    
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
        try {
            const userId = req.user._id
            // console.log(userId)
            const qouteRetweet = await Text.findOne({_id:id}).sort({ createdAt: -1 })
            console.log(qouteRetweet)
            const text = await User.findByIdAndUpdate({ _id: userId }, { $pull: { myQouteRetweet: id } })
           
            
        }
        catch {
            res.status(400).json({error: error.message})
            
        }
}
const followingUpdate = async (req, res) => {
    const { id } = req.params
    const { authorization } = req.headers
    
    const token = authorization.split(" ")[1]
    // console.log(token)
    
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
    try {
        const userId = req.user._id
        const text = await User.findByIdAndUpdate({ _id: id }, { $push: { follwoing: userId } })
        const workouts = await User.findOne({_id:id}).sort({ createdAt: -1 })
        res.status(200).json(workouts)
    }
    catch{
        res.status(400).json({error: error.message})
    }
}
const followingDelete = async (req, res) => {
    const { id } = req.params
    const { authorization } = req.headers
    
    const token = authorization.split(" ")[1]
    // console.log(token)
    
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
    try {
        const userId = req.user._id
        const text = await User.findByIdAndUpdate({ _id: id }, { $pull: { follwoing: userId } })
        const workouts = await User.findOne({_id:id}).sort({ createdAt: -1 })
        res.status(200).json(workouts)
    }
    catch{
        res.status(400).json({error: error.message})
    }
}
const followersUpdate = async (req, res) => {
    const { id } = req.params
    const { authorization } = req.headers
    
    const token = authorization.split(" ")[1]
    // console.log(token)
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
    try {
        const userId = req.user._id
        const text =  await User.findByIdAndUpdate({ _id: userId }, { $push: { followers: id } })
        const workouts = await User.findOne({_id:id}).sort({ createdAt: -1 })
        res.status(200).json(workouts)
    }
    catch{
        res.status(400).json({error: error.message})
    }
}
const followersDelete = async (req, res) => {
    const { id } = req.params
    const { authorization } = req.headers
    
    const token = authorization.split(" ")[1]
    // console.log(token)
    const { _id } = jwt.verify(token, process.env.KEY)
        req.user = await User.findOne({_id}).select("_id")
    try {
        const userId = req.user._id
        const text =  await User.findByIdAndUpdate({ _id: userId }, { $pull: { followers: id } })
        const workouts = await User.findOne({_id:id}).sort({ createdAt: -1 })
        res.status(200).json(workouts)
    }
    catch{
        res.status(400).json({error: error.message})
    }
}
const deeletemyPost= async (req,res) => {
    const { id } = req.params
        try {
            await User.updateMany({}, { $pull: { idOfThePost: id } });
            await User.updateMany({}, { $pull: { myLikes: id } });
            await User.updateMany({}, { $pull: { myQouteRetweet: id } });
            await User.updateMany({}, { $pull: { myComments: id } });
            const account = await User.findOne({_id:id}).sort({ createdAt: -1 })
            res.status(200).json(account)
            
            
        }
        catch {
            res.status(404).json({error: "no"})
            
        }
}
module.exports = {
    resetPass, forgotpassword, loginUser, signUpUser, updateUser, getUser, updateUserName,updateEmail,
    DeleteUser, getUsers, CheckPassword, updatePasswordManually, Get, updateMyLikes, DeleteMyLike, DeleteMyTweet,
    updateMyTweet, DeleteMyQouteTweet, updateMyQouteTweet, updateMyComment, followersUpdate, followingUpdate,
    followersDelete,followingDelete,updatePosts,GetBYName,GetAllUsers,GetBYName2,deeletemyPost,DeleteText,
    deleteQouteTweet,deleteLikes,deleteComments,deleteTweet,deleteidOfTheReplier,deleteIdText,deleteFollow,
}