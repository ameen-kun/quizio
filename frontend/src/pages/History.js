import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import ReactTyped from "react-typed"
import Navbar from "../components/Navbar";

export default function History(){
    const nav=useNavigate();
    const [createdQuizes,setCreatedQuizes]=useState([]);
    const [attendedQuizes,setattendedQuizes]=useState([]);
    useEffect(()=>{
        if(!Boolean(Number(window.sessionStorage.getItem("isLogged"))))
        nav("/")
        else{
            getCreatedQuizes();
            getAttendedQuizes();
        }
    },[])
    const getCreatedQuizes=async()=>{
        try{
            const res=await axios.get("http://localhost:8080/history/created/"+window.sessionStorage.getItem("userid"));
            setCreatedQuizes(res.data);
        }
        catch(error){
            console.log(error);
        }
    }
    const getAttendedQuizes=async()=>{
        try{
            const res=await axios.get("http://localhost:8080/history/attended/"+window.sessionStorage.getItem("userid"));
            setattendedQuizes(res.data);
        }
        catch(error){
            console.log(error);
        }
        
    }
    
    if(Boolean(Number(window.sessionStorage.getItem("isLogged"))))
    return(
        <div className="terminal-box">
            <div className="terminal-window">
                <Navbar/>
            <h2><ReactTyped strings={[window.sessionStorage.getItem("name")+"'s History"]} typeSpeed={50} cursorChar="_"/></h2>
            <h4><ReactTyped strings={["Quizes Created By You:"]} typeSpeed={50} showCursor={false}/></h4>
            {createdQuizes.length>0 &&
            <table>
                <tr>
                    <th>QuizCode</th>
                    <th>Created On</th>
                    <th>Participants</th>
                </tr>
                {createdQuizes.map((i,index)=>{
                    return(
                        <tr key={index}>
                            <td><ReactTyped strings={[String(i?.quizcode)]} typeSpeed={50} showCursor={false}/></td>
                            <td><ReactTyped strings={[String(new Date(i?.createdOn))]} typeSpeed={50} showCursor={false}/></td>
                            <td><ReactTyped strings={[String(i?.participants)]} typeSpeed={50} showCursor={false}/></td>
                        </tr>
                    )
                })}
            </table>
        }
            {createdQuizes.length===0 &&
            <h5><ReactTyped strings={["You havent't created any quizes."]} typeSpeed={50} showCursor={false}/></h5>
        }
        <br/>
        <hr/>
            <h4><ReactTyped strings={["Your Performance:"]} typeSpeed={50} showCursor={false}/></h4>
            {attendedQuizes.length>0 &&
            <table>
                <tr>
                    <th>QuizCode</th>
                    <th>Score</th>
                    <th>Attended On</th>
                </tr>
                {attendedQuizes.map((i,index)=>{
                    return(
                        <tr key={index}>
                            <td><ReactTyped strings={[String(i?.quizcode)]} typeSpeed={50} showCursor={false}/></td>
                            <td><ReactTyped strings={[String(i?.score)+" / "+String(i?.total)]} typeSpeed={50} showCursor={false}/></td>
                            <td><ReactTyped strings={[String(new Date(i?.attendedOn))]} typeSpeed={50} showCursor={false}/></td>
                        </tr>
                    )
                })}
            </table>
        }
            {attendedQuizes.length===0 &&
            <h5><ReactTyped strings={["You haven't attended any quizes."]} typeSpeed={50} showCursor={false}/></h5>
            }
            </div>
        </div>
    )
}