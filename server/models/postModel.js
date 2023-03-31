import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
  title:  {
    type: String,
    required: true
},
message : {
    type : String,
    required : true,
    default : ""
},
  author: {
    type : String,
    required : true
  },
  creator:{
    type:String
  },
  comments: [{
    user: String ,
    comment: String,
     date: {
      type : Date,
      default : Date.now
    }
 }],
  date: { 
    type: Date,
     default: Date.now 
    },
tags : {
    type : [String],
  },
  likes : {
    type : [String],
    default : []
  },
  image: { 
    type : String,
    required : true,
    default : " "
  }
});
const PostModal = mongoose.model("Post", postSchema);

export default PostModal;