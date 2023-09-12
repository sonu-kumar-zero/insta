import mongoose from "mongoose";
const PostSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
    },
    location:String,
    description:String,
    picturePath:String,
    userPicturePath:String,
    likes:{
        type:Map,
        of:Boolean,
    },
    comment:{
        type:Map,
        of:String
    }
},{
    timestamps:true
});

const Post = mongoose.model('post', PostSchema);
export default Post;