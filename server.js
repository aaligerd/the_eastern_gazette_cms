const express = require('express');
const app = express();
const cors=require('cors');
const {db}=require('./database/db')

app.use(express.urlencoded());
app.use(cors('*'))
app.use(express.json())

db.connect((err)=>{
    if(err){
        console.log('database connetion failed: '+err);
        return;
    }
    setInterval(() => {
        db.query('SELECT 1', (err) => {
          if (err) {
            console.error('Keep-alive query failed:', err);
          }
          console.log("Connection statying alive....");
          
        });
      }, 3600000);
    console.log('SQL Connected');
})


//blog cms apis
app.use('/api/v1/story',require('./router/blogRouter'));
app.use('/api/v1/auth',require('./router/loginRouter'));
app.use('/api/v1/lables',require('./router/lableRouter'));
app.use('/api/v1/uploadFile', require('./router/blogImageUploadRouter'));


const PORT=process.env.SERVER_PORT||3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));