const express = require("express");
const { CreateText,getText, updateLikes, DeleteLike, updateReTweet, updateQouteReTweet, DeleteReTweet,DeleteQouteReTweet,
  updatecomments,DeleteReply
 } = require("../controllers/replyingComments.js");
const router = express.Router()

const path = require("path")
const multer = require("multer")
const storage = new multer.memoryStorage();
const upload = multer({ storage });
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