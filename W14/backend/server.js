const express=require('express');
const path=require('path');
const fs=require('fs');
const cors=require('cors');

const app=express();
app.use(cors());

app.get('/api/users',(req,res)=>{
    fs.readFile(path.join(__dirname,'users.json'),'utf8',(err,data)=>{
        if(err){
            console.error('Error fetching file',err);
            return res.status(500).json({error:'Error fetching file'});
        }
        try{
            const users=JSON.parse(data);
            res.json(users);
        }
        catch(parseErr){
            console.error('Error parsing data',parseErr);
            res.status(500).json({error:'Error parsing data'});
        }
    });
});

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
});
