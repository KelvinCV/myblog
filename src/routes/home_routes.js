const bcrypt = require('bcrypt');
const express = require('express');
const route = express.Router();
const passport = require('passport');

const AccountRepository = require('../database/repository/account_repo');

const saltRounds = 12;
const aRepo = new AccountRepository()

route.get("/", (_, res) => {
    res.render('pages/home')
});

route.get("/signin", (_, res) => {
    res.render('pages/signin', {error: null, values: null})
});

route.post("/signin", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/signin",
    failureFlash: true
    })
);

route.get("/signup", (_, res) => {
    res.render('pages/signup', {error: null, values: null})
});

route.post("/signup", async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let passwordConfirmation = req.body.passwordConfirmation
    
    if (password == passwordConfirmation) {

        let ac = await aRepo.findByUsername(username);

        if(ac.length == 0) {
            // crypt password
            bcrypt.hash(password, saltRounds, (_, hash)=>{
                let account = {
                    username: username,
                    password: hash,
                };
        
                aRepo.insert(account)
                console.log(ac)
    
                res.render('pages/signup_ok')
            }); 
                
        } else {
            let error = {
                message: "O nome de usuário já existe"
            }

            let values = {
                username: username,
                password: password,
                passwordConfirmation: passwordConfirmation
            }

            res.render('pages/signup', {error: error, values: values})
        }

    } else {
        let error = {
            message: "As senhas não coincidem"
        }

        let values = {
            username: username,
            password: password,
            passwordConfirmation: passwordConfirmation
        }

        res.render('pages/signup', {error: error, values: values})
    }

    
});



// route.get("/financeiro", (_, res) => {
//     res.render('pages/financeiro')
// });

module.exports = route;