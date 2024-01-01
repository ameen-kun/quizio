import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactTyped from "react-typed";
export default function Login(){
    const nav=useNavigate();
    const userRef=useRef();
    const passRef=useRef();
    const [username,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [userSubmitted,setUserSubmitted]=useState(false);
    const submitLogin=async()=>{
        try{
           const res=await axios.post("http://localhost:8080/login",{
                "username":username,
                "password":password
            });
            if(res.data){
                window.sessionStorage.setItem("name",res.data.fullname)
                window.sessionStorage.setItem("userid",res.data.id)
                window.sessionStorage.setItem("isLogged",1);
                nav("/dashboard");
            }
        }
    catch(error){
        window.alert("Invalid Credentials");
        }
    }
    return(
        <div className="terminal-box">
            <div className="terminal-window">
            <h2><ReactTyped strings={["Login"]} typeSpeed={50} cursorChar="_"/></h2>
            <p><ReactTyped strings={["Enter username"]} onComplete={()=>{
        userRef.current.focus()}}showCursor={false} typeSpeed={50}/></p>
            <input type="text" ref={userRef} className="terminal-input" disabled={userSubmitted} value={username} onChange={e=>setUserName(e.target.value)} onKeyDown={e=>{
                if(e.key==="Enter")
                setUserSubmitted(true);
            }}></input>
            {userSubmitted &&
            <div>
            <p><ReactTyped strings={["Enter password"]} onComplete={()=>
        passRef.current.focus()} showCursor={false} typeSpeed={50}/></p>
            <input type="password" ref={passRef} className="terminal-input" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>{
                if(e.key==="Enter")
                submitLogin()
        }}></input>
        </div>            
    }
        </div>
        </div>
    );
}