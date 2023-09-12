import mongoose from "mongoose";

const Chatschema = new mongoose.Schema({

    senderId:{
        type:String,
        required:true,
    },

    receivedId:{
        type:String,
        required:true,
    },

    message:{
        required:true,
        type:String,
    },

    isRead:{
        type:Boolean,
        default:false,
    },

},{
    timestamps: true
});

const Chat = mongoose.model('Chat',Chatschema);
export default Chat;