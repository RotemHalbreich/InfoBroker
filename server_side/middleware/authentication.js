const bcrypt = require('bcryptjs')
const {BadRequestError} = require("../errors")
const {StatusCodes} = require('http-status-codes')
const firebase = require('../db/connect')
const firestore = firebase.firestore();

const all_element_exists = (req, res, next) => {
    const { first_name, last_name, email, password, admin } = req.body;
    if(!first_name || !last_name || !email || !password || !admin){
        res.status(StatusCodes.BAD_REQUEST).send("please provide all the details")
    }else next()
}

const user_already_exists = async (req, res, next)=>{//for register
    const {email} = req.body
    doc = firestore.collection("Users").doc(email);
    user_data =await doc.get()
    if(!user_data.exists){
        next()
    }else{
        res.status(400).send("user already exists, please sign in");
    }

}

const user_not_exists = async(req, res, next) => {//for login

    const {email} = req.body
    doc = firestore.collection("Users").doc(email);
    user_data = await doc.get()
    if(!user_data.exists){
        res.status(400).send("the given user does not exist, please register");
    }else{
        next()
    }
}


const passwordHash = async (req, res, next) => {
    let {password} = req.body
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    req.body.password = hashedPassword
    next()
}
module.exports = {
    passwordHash,
    all_element_exists,
    user_already_exists,
    user_not_exists

}