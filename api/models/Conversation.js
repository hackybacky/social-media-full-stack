const mongoose = require("mongoose");
//creating post schema 

const ConversationSchema = new mongoose.Schema({
  
    
    members:{
        type:Array,
    },

},
    {
        timestamps: true
    }

);

//exporting model as User (only accessed through name User)
module.exports = mongoose.model("Conversation", ConversationSchema)