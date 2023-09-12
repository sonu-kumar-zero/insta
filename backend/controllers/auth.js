import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// register user
export const register = async(req,res)=>{
    try {
        const {
            username,
            firstname,
            lastname,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        console.log({
            username,
            firstname,
            lastname,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        })

        const salt = await bcrypt.genSalt();
        const passwordhash = await bcrypt.hash(password,salt);
        console.log({passwordhash:passwordhash});
        const newuser = new User({
            username,
            firstname,
            lastname,
            email,
            password:passwordhash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile : Math.floor(Math.random() *10000),
            impressions: Math.floor(Math.random() *10000)
        });
        const savedUser = await newuser.save();
        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


// log in
export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        console.log(email,password);
        const user = await User.findOne({email:email});
        if(!user) return res.status(400).json({msg:"user does not exist"});

        const ismatch = await bcrypt.compare(password,user.password);
        if(!ismatch) return res.status(401).json({msg:"invalid credentials"});

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
        delete user.password;
        return res.status(200).json({token,user});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

