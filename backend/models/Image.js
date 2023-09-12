import mongoose from 'mongoose';
const imageSchema = mongoose.Schema({
    image:String,
    imageId:{
        type:String,
        required:true,
        unique : true,
    }
},{
    timestamps:true
});

const ImageModel = mongoose.model('Image',imageSchema);
export default ImageModel;