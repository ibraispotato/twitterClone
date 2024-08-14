const { resetPass,
  forgotpassword, loginUser, signUpUser, updatePasswordManually, Get, updateUserName, updateUser,
  getUser, DeleteUser, updateEmail, getUsers, CheckPassword,updateMyLikes,DeleteMyLike,DeleteMyTweet,
  updateMyTweet, DeleteMyQouteTweet, updateMyQouteTweet, updateMyComment, followersUpdate, followingUpdate,
  followersDelete,followingDelete,updatePosts,GetBYName,GetAllUsers,GetBYName2,deeletemyPost,DeleteText,
  deleteQouteTweet,deleteLikes,deleteComments,deleteTweet,deleteidOfTheReplier,deleteIdText,deleteFollow,} = require("../controllers/userProfilecontroller");
const express = require("express");
const route = express.Router()
const nodemailer = require('nodemailer')
const { v4: uuidv4 } = require("uuid")
const path = require("path")
const multer = require("multer")

const storage = new multer.memoryStorage();
const upload = multer({ storage });
route.post("/updateMyLikes/:id", updateMyLikes)
route.post("/updateMyTweet/:id", updateMyTweet)
route.post("/updateMyPosts/:id", updatePosts)
route.post("/updateMyQouteTweet/:id", updateMyQouteTweet)
route.post("/updateMyComments/:id", updateMyComment)
route.post("/followersUpdate/:id", followersUpdate)
route.post("/followingUpdate/:id", followingUpdate)
route.post("/getUserByName",GetBYName)



route.get("/getAllUsers", GetAllUsers)
route.get("/getAllUsers2/:names", GetBYName2)
route.get("/getuser/:id", getUser)
route.get("/getuserers/:id", Get)
route.get("/getusers/:id", getUsers)


route.delete("/followersDelete/:id", followersDelete)
route.delete("/followingDelete/:id", followingDelete)
route.delete("/deleteMyLikes/:id", DeleteMyLike)
route.delete("/deleteMyTweet/:id", DeleteMyTweet)
route.delete("/deleteMyQouteTweet/:id", DeleteMyQouteTweet)
route.delete("/deleteMyPost/:id",deeletemyPost)
route.delete("/deleteQouteTweet/:id",deleteQouteTweet)
route.delete("/deleteLikes/:id",deleteLikes)
route.delete("/deleteComments/:id",deleteComments)
route.delete("/deleteTweet/:id",deleteTweet)
route.delete("/deleteidOfTheReplier/:id",deleteidOfTheReplier)
route.delete("/deleteIdText/:id",deleteIdText)
route.delete("/deleteFollow/:id",deleteFollow)
route.delete("/deleteuser/:id",DeleteUser)
route.delete("/deleteTexts/:id",DeleteText)


route.post("/signup",signUpUser)
route.post("/resetpassword/:token",resetPass)
route.post("/forgotpassword",forgotpassword)
route.post("/login", loginUser)
route.post("/Auth", CheckPassword)
route.post("/userName/:tokens", updateUserName)
route.post("/email/:tokens", updateEmail)
route.post("/passwordmanually/:tokens",updatePasswordManually)


route.patch("/updateprofile/:id",upload.single("photo"),updateUser)


module.exports = route