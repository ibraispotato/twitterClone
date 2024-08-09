const express = require("express");
const { CreateText,getText, updateLikes, DeleteLike, updateReTweet, updateQouteReTweet, DeleteReTweet,DeleteQouteReTweet,
  updatecomments,DeleteReply
 } = require("../controllers/replyingComments.js");
const router = express.Router()

const path = require("path")
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
      cb(null, "../frontend/src/images")
    },
    
    filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + Date.now() + '-' + path.extname(file.originalname))
    }
  })
  const fileFilter = (req, file, cb) => {
    const allowedFileTYpes = ["image/jpeg", "image/jpg", "image/png","video/mp4"]
    if (allowedFileTYpes.includes(file.mimetype)) {
      cb(null, true)
      
    }else{
      cb(null,false)
    }
  }
  const upload = multer({ storage: storage , filename: fileFilter,  limits: {
    fileSize: 1024 * 1024 * 6
  },})

  router.post("/replyingComments/:id", upload.single("photo"),CreateText)
  router.post("/updateLikesComment/:id", updateLikes)
  router.post("/updateReTweetComment/:id", updateReTweet)
  router.post("/updateQouteReTweetComment/:id/:idRetweet",upload.single("photo"), updateQouteReTweet)
  router.post("/updateReqplyinComments/:id/:idComment", updatecomments)


  
  router.get("/getreplyingComments/:id", getText)



  router.delete("/deleteRqplyingQouteReTweet/:id", DeleteQouteReTweet)
  router.delete("/deleteText/:id",DeleteReply)
  router.delete("/deleteReplyReTweet/:id", DeleteReTweet)
  router.delete("/deleteLikesComment/:id", DeleteLike)
module.exports = router