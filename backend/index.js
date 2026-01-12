const express=require('express');
require('dotenv').config();
const app=express();
const cors=require('cors');
const axios=require('axios');
app.use(cors({origin:'*'}));
const PORT=8080;
app.use(express.json());
app.listen(PORT,()=>console.log(`server running on port ${PORT}`))

app.post('/chatbot',async(req,res)=>{
    const {prompt}=req.body;
    if (!prompt || typeof prompt !== 'string') {
        return res.status(400).json({ message: 'Invalid prompt' });
    }

    try{
        const response = await axios.post(
        'https://router.huggingface.co/v1/chat/completions',
        {
            model:"deepseek-ai/DeepSeek-V3.2:novita",
            messages:[
                {
                    "role": "user",
                    "content":prompt
                }
            ],
        },
        {
            headers:{
                "Authorization": `Bearer ${process.env.HF_API_KEY}`,
                "Content-Type": "application/json"
            }
        }
    )
    res.status(200).send({message:response.data.choices[0].message.content});
    }catch(error){
        console.error('Chatbot error:',error.message);
        res.status(500).send({message:'Chatbot request failed'});
    }
    
});

// app.get('/login',(req,res)=>{
//     res.status(200).send({message:'Login successful'});
// });
// app.post('/check',(req,res)=>{
//     const {username,password}=req.body;
//     if(username==='admin' && password==='admin123'){
//         res.status(200).send({message:'Login successful'});
//     }else{
//         res.status(401).send({message:'Invalid credentials'});
//     }
// })