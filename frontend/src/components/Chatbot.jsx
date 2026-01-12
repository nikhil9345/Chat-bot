import React from 'react'
import axios from 'axios'
import './Chatbot.css'
const Chatbot = () => {
    const [messages,setMessages]=React.useState([]);
    const [prompt,setPrompt]=React.useState('');
    const [loading,setLoading]=React.useState(false);
    const handleSubmit=async()=>{
        if(!prompt.trim()) return;
        const newMessages={role:'user',content:prompt};
        setMessages((prev)=>[...prev,newMessages]);
        setPrompt('');
        setLoading(true);
        try{
            const responce=await axios.post("http://localhost:8080/chatbot",{
                prompt
            });
            const botmessage={role:'bot',content:responce.data.message}
            setMessages((prev)=>[...prev,botmessage]);
        }catch(error){
            setMessages((prev)=>[...prev,{role:'bot',content:'Error: Could not fetch response from chatbot.'}]);
        }finally{
            setLoading(false);
        }
    };
  return (
    <div className='container'>
      <h1>Chatbot</h1>
      <div className='chatbox'>
        {messages.map((msg,index)=>(
            <div key={index} className={msg.role==='user'?'user-message':'bot-message'}>{msg.content}</div>
        ))}
        {loading && <div className='bot-message'>Typing...</div>}
      </div>
      <div>
        <input
          placeholder='prompt'
          className='prompt'
          value={prompt}
          onChange={(e)=>setPrompt(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSubmit(); } }}
        />
        <button className='submit-btn' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}
export default Chatbot
