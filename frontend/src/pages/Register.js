import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactTyped from "react-typed";
import validator from "validator";

export default function Register(){
    const nav=useNavigate();
    const userRef=useRef();
    const passRef=useRef();
    const fullNameRef=useRef();
    const emailRef=useRef();
    const [username,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [fullName,setFullName]=useState("");
    const [email,setEmail]=useState("");
    const [userSubmitted,setUserSubmitted]=useState(false);
    const [passSubmitted,setPassSubmitted]=useState(false);
    const [nameSubmitted,setNameSubmitted]=useState(false);
    const registerSubmit=async()=>{
        if(!validator.isAlphanumeric(username)){
            window.alert("Invalid Username");
            setUserSubmitted(false);
            return;
        }
        if(!validator.isStrongPassword(password)){
            window.alert("Weak Password");
            setPassSubmitted(false);
            return;
        }
        var li=fullName.split(" ");
        li.forEach((x)=>{
            if(!validator.isAlpha(x))
            {
                window.alert("Invalid Name");
                setNameSubmitted(false);
                return;
            }
        })
        if(!validator.isEmail(email)){
            window.alert("Invalid Email");
            return;
        }
        try{
            await axios.post("http://localhost:8080/register",{
                "username":username,
                "password":password,
                "fullname":fullName,
                "email":email
            });
            window.alert("User Registered");
            nav("/")
        }
        catch(error){
            console.log(error);
        }
    }
    const findFocus=()=>{
        if(!userSubmitted)
        return userRef.current.focus()
        if(!passSubmitted)
        return passRef.current.focus()
        if(!nameSubmitted)
        return fullNameRef.current.focus()
        return emailRef.current.focus()
    }
    return (
        <div className="terminal-box" onClick={findFocus}>
            <div className="terminal-window">
            <h2><ReactTyped strings={["Registration"]} typeSpeed={50} cursorChar="_"/></h2>
                <p><ReactTyped strings={["Enter username"]} typeSpeed={50} showCursor={false} onComplete={()=>userRef.current.focus()}/></p>
                <input type="text" ref={userRef} className="terminal-input" disabled={userSubmitted} value={username} onChange={e=>setUserName(e.target.value)} onKeyDown={e=>{
                if(e.key==="Enter")
                setUserSubmitted(true)
            }}></input>
            {userSubmitted &&
            <>
                <p><ReactTyped strings={["Enter password"]} typeSpeed={50} showCursor={false} onComplete={()=>passRef.current.focus()}/></p>
                <input type="password" ref={passRef} className="terminal-input" disabled={passSubmitted} value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>{
                    if(e.key==="Enter")
                    setPassSubmitted(true)
            }}></input>
            {passSubmitted && 
            <>
            <p><ReactTyped strings={["Enter FullName"]} typeSpeed={50} showCursor={false} onComplete={()=>fullNameRef.current.focus()}/></p>
            <input type="text" ref={fullNameRef} className="terminal-input" disabled={nameSubmitted} value={fullName} onChange={e=>setFullName(e.target.value)} onKeyDown={e=>{
                if(e.key==="Enter")
                setNameSubmitted(true)
        }}></input>
            {nameSubmitted &&
            <>
            <p><ReactTyped strings={["Enter Email"]} typeSpeed={50} showCursor={false} onComplete={()=>emailRef.current.focus()}/></p>
            <input type="email" ref={emailRef} className="terminal-input" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>{
                if(e.key==="Enter")
                registerSubmit()
        }}></input>
            </>}
            </>}
            </>}
        </div>
        </div>
    )
}