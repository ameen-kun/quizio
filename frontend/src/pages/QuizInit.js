import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate} from "react-router-dom";
import ReactTyped from "react-typed"
import validator from "validator";
import Navbar from "../components/Navbar";

export default function QuizInit(){
    const nav=useNavigate();
    const [quizcode,setQuizCode]=useState("");
    const quizCRef=useRef();
    useEffect(()=>{
        if(!Boolean(Number(window.sessionStorage.getItem("isLogged"))))
        nav("/")
    },[])
    const getQuiz=async()=>{
        if(!validator.isAlphanumeric(quizcode)){
            window.alert("Invalid Quiz Code");
            return;
        }
        try{
            const r=await axios.get("http://localhost:8080/checkQuiz/"+quizcode);
            if(!r.data){
                window.alert("Invalid Quiz Code");
                return;
            }
            const res=await axios.get("http://localhost:8080/checkTaken/"+quizcode+"/"+window.sessionStorage.getItem("userid"));
            if(res.data){
                window.alert("You have already attempted this quiz.");
                return;
            }
            nav("/quiz/"+quizcode);
        }
        catch(error){
            console.log(error);
        }
    }
    
    if(Boolean(Number(window.sessionStorage.getItem("isLogged"))))
    return(
        <div className="terminal-box" onClick={e=>quizCRef.current.focus()}>
            <div className="terminal-window">
                <Navbar/>
            <h2><ReactTyped strings={["Take Quiz"]} typeSpeed={50} cursorChar='_'/></h2>
            <p><ReactTyped strings={["Enter Quiz Code"]} onComplete={()=>{
        quizCRef.current.focus()}}showCursor={false} typeSpeed={50}/></p>
            <input type="text" ref={quizCRef} className="terminal-input" value={quizcode} onChange={e=>setQuizCode(e.target.value)} onKeyDown={e=>{
                if(e.key==="Enter")
                getQuiz();
            }}></input>
            </div>
        </div>
    )
}