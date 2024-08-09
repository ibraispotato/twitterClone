const jwt = require('jsonwebtoken')
const User = require("../schema/userschema")
const auth = async (req, res, token) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({error: 'Invalid authorization'})
    }
    const token = authorization.split(" ")[1]
    try {
        const { _id } = jwt.verify(token, process.KEY)
        req.user = await User.findOne({_id}).select("_id")
        next()
    }
    catch (error) {
        console.log(error)
        return res.status(401).json({error: 'Invalid token'})
    }
}
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send("Not authorized as an admin");
    }
  };
module.exports = {auth,authorizeAdmin}