const express = require("express");
const { GetOneAndDelete, CreateText, GetAllText, updateLikes, DeleteLike,
  updateReTweet, DeleteReTweet, GetOneText, updateQouteReTweet, DeleteQouteReTweet, updatecomments,
  getReply,deletePost
    
 } = require("../controllers/test.js");
const router = express.Router()

const path = require("path")
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        
      cb(null, "../backend/images")

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
      // "image/jpeg", "image/jpg", "image/png",
    }else{
      cb(null,false)
    }
  }
  const upload = multer({ storage: storage , filename: fileFilter,  limits: {
    fileSize: 1024 * 1024 * 6
  },})
  router.post("/:id", updateLikes)
  
  router.post("/updateReTweet/:id", updateReTweet)
  router.post("/updateQouteReTweet/:id/:idRetweet",upload.single("photo"), updateQouteReTweet)
  router.post("/updateComments/:id/:idComment", updatecomments)
  router.post("/", upload.single("photo"),CreateText)
  

  router.get("/getReplies/:id", getReply)
  router.get("/", GetAllText)
  router.get("/GetOneText/:id",GetOneText)

  
  router.delete("/delete/:id", DeleteLike)
  router.delete("/deleteQouteReTweet/:id", DeleteQouteReTweet)
  router.delete("/deleteReTweet/:id", DeleteReTweet)
  router.delete("/deteText/:id",deletePost)
  router.delete("/:id", GetOneAndDelete)




module.exports = router