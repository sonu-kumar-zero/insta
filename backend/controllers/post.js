import Post from '../models/Post.js';
import User from '../models/User.js';

// create
export const createPost = async(req,res)=>{
    try {
        const {userId,description,picturePath} = req.body;
        const user = await User.findById(userId);
        const newpost = new Post({
            userId,
            username:user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            location: user.location,
            description,
            userPicturePath:user.picturePath,
            picturePath,
            likes:{},
            comments:[]
        });

        await newpost.save();
        res.status(201).json({message:"post added successfully"});
    } catch (error) {
        res.status(409).json({message: error.message});
    }
};

// read

export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find().sort({createdAt: -1}).limit(10);
        // const post = await Post.aggregate([{ $sample: { size: 5 } }]);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const {userid} = req.params;
        const post = await Post.find({userId: userid}).sort({createdAt: -1});
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const addcomment = async(req,res)=>{
    try {
        const {id} = req.params;
        const {userId, comment} = req.body;
        const post = await Post.findById(id);
        post.comment.set(userId, comment);
        await post.save();
        res.status(200).json({message:"comment added successfully"});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}


// update
export const likePost = async(req,res)=>{
    try {
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isliked = post.likes.get(userId);
        if(isliked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId,true);
        };
        await post.save();
        const newpost = await Post.findById(id);
        res.status(200).json(newpost);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};