const mongoose = require('mongoose')
const schema = mongoose.Schema

const SCHEMA = new schema({
    retweetComments: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        
    },
    retweet: {
        type: Array,
    },
    QouteTweet: {
        type:Array
    },
    likes: {
        type: Array,
    },
    comments:{
        type: Array,
    },
    idText: {
        type: Array,
        required: true
    },
    idOfTheReplyer: {
        type: Array,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("replyingComments",SCHEMA)