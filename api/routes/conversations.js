const router = require("express").Router();

const { createCipheriv } = require("crypto");
const Conversation =require("../models/Conversation")

// new conversation

router.post('/',async (req,res)=>{
    const newConversation = new Conversation({
        members:[req.body.senderId,req.body.receiverId]
    });

    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/:userId",async (req,res)=>{
    try{
        const conversations = await Conversation.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(conversations);
    }catch(err){
        res.status(500).json(err);
    }
})


router.get("/find/:firstUserId/:secondUserId",async(req,res)=>{
    try{
        const con = await Conversation.findOne({
            members:{$all:[req.params.firstUserId,req.params.secondUserId]},
        })
        //console.log(con)
        res.status(200).json(con);
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;