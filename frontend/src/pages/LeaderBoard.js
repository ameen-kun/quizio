import axios from "axios";
import { useRef, useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactTyped from "react-typed";
import validator from "validator";
import Navbar from "../components/Navbar";
export default function LeaderBoard(){
    const nav=useNavigate()
    const quizCRef=useRef();
    const [quizcode,setQuizCode]=useState("");
    const [qcodeSubmitted,setqCodeSubmitted]=useState(false)
    const [leaderboard,setLeaderboard]=useState([]);
    useEffect(()=>{
        if(!Boolean(Number(window.sessionStorage.getItem("isLogged"))))
        nav("/")
    },[])
    const getLeaderboard=async()=>{
        if(!validator.isNumeric(quizcode)){
            window.alert("Invalid Quiz Code");
            return;
        }
        try{
            const res=await axios.get("http://localhost:8080/leaderboard/"+quizcode);
            setLeaderboard(res.data);
            setqCodeSubmitted(true)
        }
        catch(error){
            window.alert("Invalid Quiz Code");
        }
    }
    
    if(Boolean(Number(window.sessionStorage.getItem("isLogged"))))
    return(
        <div className="terminal-box" onClick={e=>quizCRef.current.focus()}>
            <div className="terminal-window">
                <Navbar/>
            <h2><ReactTyped strings={["Leaderboard"]} typeSpeed={50} cursorChar="_"/></h2>
            <p><ReactTyped strings={["Enter Quiz Code"]} onComplete={()=>{
        quizCRef.current.focus()}}showCursor={false} typeSpeed={50}/></p>
            <input type="text" ref={quizCRef} disabled={qcodeSubmitted} className="terminal-input" value={quizcode} onChange={e=>setQuizCode(e.target.value)} onKeyDown={e=>{
                if(e.key==="Enter")
                getLeaderboard();
            }}></input>
            <br/>
            <br/>
            {qcodeSubmitted && 
            <>
            {leaderboard.length>0 &&
            <table>
            <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Score</th>
            </tr>
            {leaderboard.map((i,index)=>{
                return(
                    <tr key={index}>
                        <td><ReactTyped strings={[String(index+1)]} typeSpeed={50} showCursor={false}/></td>
                        <td><ReactTyped strings={[String(i?.name)]} typeSpeed={50} showCursor={false}/></td>
                       <td><ReactTyped strings={[String(i?.score)+" / "+String(i?.total)]} typeSpeed={50} showCursor={false}/></td>
                    </tr>
                )
            })}
            </table>
            }
            {leaderboard.length===0 &&
                <h5><ReactTyped strings={["No participants for the quiz."]} typeSpeed={50} showCursor={false}/></h5>
            }
            </>}
            </div>
        </div>
    )
}