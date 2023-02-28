const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const UserModel = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User.js');
require('dotenv').config()
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefram4ghf67cg8hvhv8chc7787g87g7g';

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

// console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test');
});

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    try{
        const userDoc = await User.create({
            name, 
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        });
    
        res.json(userDoc);
    } catch(e){
        res.status(422).json(e);
    }

});


app.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const userDoc = await User.findOne({email});

    if(userDoc){
        // res.json('found');
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if(passOk){
            jwt.sign({email:userDoc.email, id:userDoc._id}, jwtSecret, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json('pass ok');
            });
            
        }else{
            res.status(422).json('pass not ok');
        }
    }else{
        res.json('not found');
    }

});


app.listen(4000);