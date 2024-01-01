import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactTyped from 'react-typed';
import Navbar from '../components/Navbar';


const TakeQuiz = () => {
  const nav=useNavigate();
  const params=useParams();
  const [quizData,setQuizData]=useState([]);
  const getData=async()=>{
    try{
      const res=await axios.get("http://localhost:8080/quiz/"+params.id);
      setQuizData(res.data);
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    if(!Boolean(Number(window.sessionStorage.getItem("isLogged"))))
    nav("/")
    getData();
  },[])
  const [userAnswers, setUserAnswers] = useState({});

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [quizData[questionIndex].question]: selectedOption,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const res=await axios.post("http://localhost:8080/take/"+params.id+"/"+window.sessionStorage.getItem("userid"),userAnswers);
        window.alert('Quiz Submitted');
        window.alert("You Scored: "+res.data.score);
        nav("/dashboard")
      }
    catch(error){
      console.log(error);
    }
  };

  
  if(Boolean(Number(window.sessionStorage.getItem("isLogged"))))
  return (
    <div className="terminal-box" tabIndex="0">
      <div className="terminal-window">
        <Navbar/>
        <h2>
          <ReactTyped strings={['Quiz #'+params.id]} typeSpeed={50} cursorChar="_" />
        </h2>
        <form onSubmit={handleSubmit}>
          {quizData.map((question, index) => (
            <div key={index}>
              <p>
                <ReactTyped
                  strings={[`Question ${index + 1}: ${question.question}`]}
                  typeSpeed={50}
                  showCursor={false}
                />
              </p>
              <ul>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex}>
                    <label className='custom-radio'>
                      <input
                        type="radio"
                        name={`question_${index}`}
                        value={option}
                        checked={userAnswers[quizData[index].question] === option}
                        onChange={() => handleAnswerChange(index, option)}
                      />
                      <p className={userAnswers[quizData[index].question]===option?"opt-selected":""}>
                      <ReactTyped strings={[option]} typeSpeed={50} showCursor={false}/>
                      </p>
                      <span className="checkmark"></span>
                    </label>
                  </div>
                ))}
              </ul>
            </div>
          ))}
          <p>
            <button type="submit">Submit</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default TakeQuiz;
