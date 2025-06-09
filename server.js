const express = require('express');
const app = express();
const cors=require('cors');
const {db}=require('./database/db')
require('dotenv').config();

app.use(express.urlencoded());
app.use(cors('*'))
app.use(express.json())

db.connect((err)=>{
    if(err){
        console.log('database connetion failed: '+err);
        return;
    }
    console.log("Database Connected");
})

//blog cms apis
app.use('/api/v1/story',require('./router/blogRouter'));



app.use('/api/v1/uploadFile', require('./router/blogImageUploadRouter'));
app.listen(8008, () => console.log('Server running on port 8008'));
