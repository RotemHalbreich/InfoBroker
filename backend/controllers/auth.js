// 'use strict'
// const db = require('../db');
// const firebase = require('../db');
// const User = require('../models/user');
// const firestore = firebase.firestore();

const register = async(req, res) =>{
    res.send("register user")
}

const login = async(req, res) =>{
    res.send("login user")
}

const isUserLoggedIn = async(req, res) =>{
    res.send("login check")
}

const signout = async(req, res)=> {
    res.send("sign out user")
}
module.exports = {
    register,
    login,
    isUserLoggedIn,
    signout
}



// const addUser = async(req,res,next) => {
//     try{
//         const { id, first_name, last_name, mail, password } = req.body;
//         const doc = firestore.collection("Users").doc();
//         let newUser = new User(
//             doc.id,
//             first_name,
//             last_name, 
//             mail, 
//             password
//         );
//         newUser = JSON.parse(JSON.stringify(newUser));
//         await doc.set(newUser);
//         res.status(200).send(newUser);
//     }
//     catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// module.exports = {
//     addUser
// }