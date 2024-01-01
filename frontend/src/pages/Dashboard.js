import { useState,useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactTyped from "react-typed";
import Navbar from "../components/Navbar";
export default function Dashboard(){
    const nav=useNavigate();
    const inpRef=useRef();
    const name=window.sessionStorage.getItem("name")
    const [choice,setChoice]=useState("");
    useEffect(()=>{
        if(!Boolean(Number(window.sessionStorage.getItem("isLogged"))))
        nav("/")
    },[])
    const submit=()=>{
        if(choice==='1')
        nav("/create")
        else if(choice==='2')
        nav("/take")
        else if(choice==='3')
        nav("/leaderboard")
        else if(choice==='4')
        nav("/history")
        else if(choice==='5')
        logoff();
        else
        window.alert("Invalid Choice");
    }
    const logoff=()=>{
        window.sessionStorage.clear();
        nav("/");
    }
    
    if(Boolean(Number(window.sessionStorage.getItem("isLogged"))))
    return(
        <div className="terminal-box" onClick={e=>inpRef.current.focus()}>
            <div className="terminal-window">
            <Navbar/>
            <h2><ReactTyped strings={["Hello "+name+"! What would you like to do?"]} cursorChar='_' typeSpeed={30}/></h2>
            <p className="home-options" onClick={e=>nav("/create")}><ReactTyped strings={["1. Create Quiz"]} typeSpeed={50} showCursor={false}/></p>
            <p className="home-options" onClick={e=>nav("/take")}><ReactTyped strings={["2. Take Quiz"]} typeSpeed={50} showCursor={false}/></p>
            <p className="home-options" onClick={e=>nav("/leaderboard")}><ReactTyped strings={["3. See Leaderboard"]} typeSpeed={50} showCursor={false}/></p>
            <p className="home-options" onClick={e=>nav("/history")}><ReactTyped strings={["4. History"]} typeSpeed={50} showCursor={false}/></p>
            <p className="home-options" onClick={e=>logoff()}><ReactTyped strings={["5. LogOut"]} typeSpeed={50} showCursor={false}/></p>
            <p><ReactTyped strings={["Enter Choice"]} typeSpeed={50} onComplete={e=>inpRef.current.focus()} showCursor={false}/></p>
            <input className="terminal-input" type='text' ref={inpRef} value={choice} onChange={e=>setChoice(e.target.value)} onKeyDown={e=>{
              if(e.key==="Enter")
              submit()
            }}></input>
            </div>
        </div>
    )
}