import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import{Route,Routes} from 'react-router-dom'; 
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import LeaderBoard from './pages/LeaderBoard';
import CreateQuiz from './pages/CreateQuiz';
import TakeQuiz from './pages/TakeQuiz';
import QuizInit from './pages/QuizInit';

function App() {
  return (
    <Routes>
      <Route element={<Home/>} path="/"/>
      <Route element={<Login/>} path="/login"/>
      <Route element={<Register/>} path="/register"/>
      <Route element={<Dashboard/>} path="/dashboard"/> 
      <Route element={<History/>} path="/history"/>
      <Route element={<LeaderBoard/>} path="/leaderboard"/>
      <Route element={<CreateQuiz/>} path="/create"/>
      <Route element={<QuizInit/>} path="/take"/>
      <Route path="/quiz/:id" element={<TakeQuiz/>}/>
    </Routes>
  );
}

export default App;
