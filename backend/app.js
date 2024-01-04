const express = require('express');
const port = process.env.PORT || 3001
const app = express();
const connectToDb = require('./db')
connectToDb();
const fileUpload = require("express-fileupload");
const UserRoutes = require('./routes/user')
const postRoutes = require('./routes/post')





app.get('/',(req,res)=>{
  res.send("home page")
})
var cors = require('cors')
app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors())
app.use('/api/users',UserRoutes)
app.use('/api/posts',postRoutes)

app.listen(port,()=>{
    console.log("surver is running on port ",port);
})