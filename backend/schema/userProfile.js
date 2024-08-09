const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validater= require("validator")
const SCHEMA = new schema({
    name: {
        type: String,
        required: true,
        
    },
    userName: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        // required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    bio: {
        type: String,
        // required:true
    },
    myRetweet: {
        type: Array,
        
        
    },
    idOfThePost: {
        type: Array,

    },
    myLikes: {
        type: Array,
       
        
        
    },
    myQouteRetweet: {
        type: Array,
    },
    ////////////////////fixing the comments ASAP////////////////////////////////////////
    myComments: {
        type: Array,
        
        
    },
    /////////////////////////updating the comment////////////////////////////////////////////////
    follwoing: {
        type: Array,
    },
    followers: {
        type: Array,
    }
}, { timestamps: true })


SCHEMA.statics.signup = async function(name,userName,photo,email,password,bio) {
    if (!userName||!name||!email || !password) {
        throw Error("You must provide the inputs")
    }
    const user = await this.findOne({ email })
    const username = await this.findOne({ userName })
    
    
    if (user) {
        throw Error("This email is already in use")
        
    }
    if (username) {
        throw Error("This username is already in use")
    }
    if (!validater.isEmail(email)) {
        throw Error("Email must be a valid")
    }
    if (!validater.isStrongPassword(password)) {
        throw Error("Password is not strong")
        
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const users = await this.create({
        name, userName, email, photo, password: hash, bio
    })
    return users
}
SCHEMA.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("You must provide the inputs")
    }
    // const token = CreateToken(user._id)

    const user = await this.findOne({email})
    if (!user) {
        throw Error("Sorry, we could not find your account.")
    }
    const compare = await bcrypt.compare(password, user.password)
    // console.log(password)
    if (!compare) {
        throw Error("incorrect password,try again")
    }
    return user
}
SCHEMA.statics.forgotpassword = async function (email) {
    if (!email) {
        throw Error("You must provide the input")
    }
    const user = await this.findOne({ email })
    if (!user) {
        throw Error("this Email does not exist")
    }
    return user
}
SCHEMA.statics.UpdatePassword = async function (checkPassword, password, secPassword) {
    const user = await this.findOne(this.email)

    // console.log(user)
    if (!checkPassword||!password||!secPassword) {
        throw Error("You must provide the inputs")
    }
    
    
    // console.log(user.password)
    const compare = await bcrypt.compare(checkPassword, user.password)
    // console.log(user)

    if (password !== secPassword) {
            throw Error("password is not in match")
    }
    if (!validater.isStrongPassword(password)) {
        throw Error("Password is not strong")
        
    }
    if (!compare) {
        throw Error("incorrect password,try again")
    }
    return user
}
SCHEMA.statics.Auth = async function (password) {
    const user = await this.findOne(this.email)
    // console.log()
    
    const compare = await bcrypt.compare(password, user.password)
    // console.log(password)
    
    if (!compare) {
        throw Error("incorrect password,try again")
    }
    return user

}
SCHEMA.statics.userName = async function (userName) {
    if (!userName) {
        throw Error("You must provide the input")
        
    }
    const user = await this.findOne({userName})
    console.log(user)
    if (user) {
        throw Error("This username is already in use")
    }
    
   
    return user
}
SCHEMA.statics.Email = async function (email, password) {
    // console.log(password)
    if (!email || !password) {
        throw Error("You must provide the inputs")
    }
    const user = await this.findOne({ email })
    const users = await this.findOne(this.email)

    if (!validater.isEmail(email)) {
        throw Error("Email must be a valid")
    }
    if (user) {
        throw Error("Sorry, This email is in use")
    }
    const compare = await bcrypt.compare(password, users.password)
    // console.log(user)
    if (!compare) {
        throw Error("incorrect password,try again")
    }
    return user
}
SCHEMA.statics.getUser = async function (name) {
    const user = await this.find( name )
    return user
}
module.exports = mongoose.model("userSchema", SCHEMA)