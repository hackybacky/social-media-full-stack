const mongoose = require("mongoose");
//creating post schema 

const MessageSchema = new mongoose.Schema({
    
    conversationId:{
        type:String,
    }
    ,
    sender:{
        type:String,
    },
    text:{
        type:String,
    }

},
    {
        timestamps: true
    }

);

//exporting model as User (only accessed through name User)
module.exports = mongoose.model("Message", MessageSchema)