const express = require("express");
const { GetOneAndDelete, CreateText, GetAllText, updateLikes, DeleteLike,
  updateReTweet, DeleteReTweet, GetOneText, updateQouteReTweet, DeleteQouteReTweet, updatecomments,
  getReply,deletePost
    
 } = require("../controllers/test.js");
const router = express.Router()

const path = require("path")
const multer = require("multer")
const storage = new multer.memoryStorage();
const upload = multer({ storage });
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