import React from 'react'
import { useLocation , useNavigate} from 'react-router-dom'

function Success() {

  const location = useLocation()
  const{msg,hint} = location.state
  const navigate = useNavigate()

  return (
    <div>
      <h1>Secret message: {msg}</h1>
      <h1>Password Hint: {hint}</h1>
      <button onClick={()=>{navigate("/")}}>Go to Home</button>
    </div>
  )
}

export default Success