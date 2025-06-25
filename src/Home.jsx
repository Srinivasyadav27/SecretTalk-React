import { useState } from 'react'
import './Home.css'
import axios from  'axios'
import { useNavigate } from 'react-router-dom';

function Home() {
  const [encForm, setEncForm] = useState(false);
  const [decForm, setDecForm] = useState(false);
  const [comment,setComment]  = useState("");
  const[message, setMessage] = useState('');
  const[password,setPassword] = useState("");
  const[secret,setSecret] = useState("");
  const[password1,setPassword1] = useState("");
  const[secretFromServer, setSecretFromServer] = useState()

  const navigate = useNavigate()

    const decryptMsg = ()=>{
      axios.post(`https://locktolk-sb-production.up.railway.app/fromBase?deMessage=${encodeURIComponent(secret)}&password=${password1}`)
      .then((response)=>{
        const answer = response.data
        alert("Message is: "+answer)
      })
    
    }

    const encryptMsg = ()=>{
      axios.post(`https://locktolk-sb-production.up.railway.app/toBase?message=${message}&password=${password}`)
      .then((response) => {
      const secret = response.data;
      setSecretFromServer(secret); // still update state if needed elsewhere
      navigate("/success", { state: { msg: secret, hint: comment } });
    })


    }

      const showEncrypt = () => {
        setEncForm(true);
        setDecForm(false);
      };

      const showDecrypt = () => {
        setEncForm(false);
        setDecForm(true);
      };

      function toComment(event){
        setComment(event.target.value)
      }
  return (
    <>
      <div className="outer" >
        <div className="inner">
            <h1>Secret-Talk</h1>

            <div style={{display:"flex",alignItems:"center",justifyContent:"center",columnGap:"12px"}}>
            <button onClick={showEncrypt}>Encrypt</button>

            <button onClick={showDecrypt}>Decrypt</button>
            </div>



  
              {encForm && (
              <div id="encForm">
                  <label >Message:</label>
                  <input 
                  type="text" 
                  id="message"
                  value={message}
                  onChange={(event)=>{setMessage(event.target.value)}}
                  />
                  <label >Password:</label>
                  <input type="password" id="password"
                  value={password}
                  onChange={(event)=>{setPassword(event.target.value)}}/>
                  <textarea value={comment} onChange={toComment} placeholder='Hint'/>
                  
                  <button onClick={encryptMsg}>Encrypt</button>
              </div>
              )}

              {decForm && (
              <div id="decForm">
                  <label>DeMessage:</label>
                  <input type="text" id="demessage"
                  value={secret}
                  onChange={(event)=>{setSecret(event.target.value)}}/>
                  <label >Password:</label>
                  <input type="password" id="password"
                  value={password1}
                  onChange={(event)=>{setPassword1(event.target.value)}}/>
                  <button onClick={decryptMsg}>Decrypt Message</button>
              </div>
              )}
          </div>
      </div>
    </>
  )
}

export default Home
