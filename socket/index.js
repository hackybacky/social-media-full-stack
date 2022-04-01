const io = require("socket.io")(8900,{
  cors:{
    origin :"https://localhost:3000",
  },
})

io.on("connection",(socket)=>{
  console.log("user connected")
})
