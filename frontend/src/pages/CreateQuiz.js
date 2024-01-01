import axios from 'axios';
import React, { useRef, useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ReactTyped from 'react-typed';
import Navbar from '../components/Navbar';

const CreateQuiz = () => {
  const nav=useNavigate();
  const nInpRef=useRef();
  const [quizData, setQuizData] = useState([]);
  const [numQuestions, setNumQuestions] = useState(0);
  
  useEffect(()=>{
    if(!Boolean(Number(window.sessionStorage.getItem("isLogged"))))
    nav("/")
},[])
  const handleNumQuestionsChange = (e) => {
    const num = parseInt(e.target.value, 10);
    setNumQuestions(num || 0);
    setQuizData([]);
  };

  const handleQuestionChange = (questionIndex, field, value) => {
    setQuizData((prevData) => {
      const newData = [...prevData];
      newData[questionIndex] = {
        ...newData[questionIndex],
        [field]: value,
      };
      return newData;
    });
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res=await axios.post("http://localhost:8080/quiz/"+window.sessionStorage.getItem("userid"),
        quizData
      );
      window.alert("Quiz Created with code: "+res.data.quizcode);
      window.location.href="/dashboard";
    }
    catch(error){
      console.log(error)
    }
  };
  
  if(Boolean(Number(window.sessionStorage.getItem("isLogged"))))
  return (
    <div className="terminal-box" tabIndex="0">
      <div className='terminal-window'>
        <Navbar/>
      <h2><ReactTyped strings={["Quiz Creator"]} typeSpeed={50} cursorChar='_'/></h2>
      <form onSubmit={handleSubmit}>
        <p>
          <ReactTyped strings={["Number of Questions:"]} typeSpeed={50} showCursor={false} onComplete={()=>nInpRef.current.focus()}/>
          </p>
          <input
            className='terminal-input'
            type="number"
            min="1"
            ref={nInpRef}
            value={numQuestions}
            onChange={handleNumQuestionsChange}
            />

        {Array.from({ length: numQuestions }).map((_, index) => (
          <div key={index}>
            <p>
              <ReactTyped strings={["Question "+(index + 1)+":"]} typeSpeed={50} showCursor={false}/>
              </p>
              <input
                type="text"
                className='terminal-input-quiz'
                value={quizData[index]?.question || ''}
                onChange={(e) =>
                  handleQuestionChange(index, 'question', e.target.value)
                }
                required
              />

            <p>
              <ReactTyped strings={["Options [separated by semi-colon (;) ]:"]} typeSpeed={50} showCursor={false}/>
              </p>
              <input
                type="text"
                className='terminal-input-quiz'
                value={quizData[index]?.options?.join(';') || ''}
                onChange={(e) =>
                  handleQuestionChange(
                    index,
                    'options',
                    e.target.value.split(';')
                  )
                }
                required
              />

            <p>
              <ReactTyped strings={["Correct Answer:"]} typeSpeed={50} showCursor={false}/>
              </p>
              <input
                type="text"
                className='terminal-input-quiz'
                value={quizData[index]?.correctAnswer || ''}
                onChange={(e) =>
                  handleQuestionChange(index, 'correctAnswer', e.target.value)
                }
                required
                />
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

export default CreateQuiz;
