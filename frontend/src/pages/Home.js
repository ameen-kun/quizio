import {  useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactTyped from 'react-typed';

export default function Home(){
    const nav=useNavigate();
    const inpRef=useRef();
    window.sessionStorage.setItem("isLogged",0);
    const [choice,setChoice]=useState("");
    const submit=()=>{
        if(choice==='1')
            nav("/login");
        else if(choice==='2')
            nav("/register");
        else
            window.alert("Invalid Choice")
    }
    return (
        <div className="terminal-box" onClick={e=>inpRef.current.focus()}>
          <div className="terminal-window">
            <h2 style={{textAlign:"center"}}><ReactTyped strings={["Welcome to Quiz.io !"]} cursorChar='_' typeSpeed={30}/></h2>
            <h4 style={{textAlign:"center"}}><ReactTyped strings={["A Terminal Themed Quiz Platform"]} showCursor={false} typeSpeed={30}/></h4>
            <br/>
            <h3><ReactTyped strings={["What would you like to do?"]} typeSpeed={50} showCursor={false}/></h3>
            <p className='home-options' onClick={e=>nav("/login")}><ReactTyped strings={["1. Login"]} typeSpeed={50} showCursor={false}/></p>
            <p className='home-options' onClick={e=>nav("/register")}><ReactTyped strings={["2. Register"]} typeSpeed={50} showCursor={false}/></p>
            <p><ReactTyped strings={["Enter Choice"]} onComplete={()=>
        inpRef.current.focus()}typeSpeed={50} showCursor={false}/></p>
            <input className="terminal-input" type='text' ref={inpRef} value={choice} onChange={e=>setChoice(e.target.value)} onKeyDown={e=>{
              if(e.key==="Enter")
              submit()
            }}></input>
          </div>
        </div>
    );
}