
import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Questions from './Questions';
import NextQuestion from './NextQuestion';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';
const setSeconds=30;
const initialstate={
  questions:[],
  status:'loading',
  index:0,
  answer:null,
  points:0,
  highscore:0,
  secondsremaining:null
}
function reducer(state,action){
  switch (action.type){
  case 'DataReceived': 
  return {
    ...state,
    questions:action.payload,
    status:'Ready',
  }
  case 'Error':
    return {
      ...state,
      status:'Error'
    }
  case 'Start':
    return{
      ...state,
      status:'Start',
      secondsremaining:state.questions.length *setSeconds,

    }  
  case 'ChosenAnswer':
    const question=state.questions.at(state.index);
    return {
      ...state,
      answer:action.payload,
      points:action.payload===question.correctOption ?
            state.points+question.points : state.points
    }  
  case 'NextQuestion' :
    return{
      ...state,
      index:state.index+1,
      answer:null
    }
  case 'Finished':
    return{
      ...state,
      status:'Finished',
      highscore:state.highscore<state.points ? state.points:state.highscore,
    }
  case 'Restart':
    return{
      ...initialstate,
      status:'Ready',
      questions:state.questions
    }
     
  case 'Timer':
    return{
      ...state,
      secondsremaining:state.secondsremaining-1,
      status:state.secondsremaining===0 ? 'Finished':state.status
    }
  default : throw new Error("not working")

}
}


function App() {
  const [{status,questions,index,answer,points,highscore,secondsremaining},dispatch]=useReducer(reducer,initialstate);
  const noOfQuestions=questions.length;
  const totalPoints=questions.reduce((prev,next)=>prev+next.points,0);

  useEffect(function(){
    async function fetchData(){
     await fetch('http://localhost:8000/questions')
     .then((res)=> res.json())
     .then((data)=> dispatch({type:'DataReceived',payload:data}))
     .catch((error)=>dispatch({type:'Error'}))
    }
    fetchData()
  },[])
  return (
    <div className="app">
      <Header/>
      <Main>
        {status==='loading' && <Loader/>}
        {status==='Error' && <Error/>}
        {status==='Ready' && <StartScreen questions={noOfQuestions} dispatch={dispatch}/>}
        {status==='Start' && <> 
                             <Progress index={index} noofquestions={noOfQuestions} points={points} totalpoints={totalPoints} answer={answer} />
                             <Questions question={questions[index]} dispatch={dispatch} answer={answer}/>
                             <Footer>
                              <Timer secondsremaining={secondsremaining} dispatch={dispatch}/>
                             <NextQuestion dispatch={dispatch} answer={answer} index={index} noofquestions={noOfQuestions}/>
                            </Footer>
                             </>}
                            
        {status==='Finished' && <FinishScreen points={points} totalpoints={totalPoints} highscore={highscore} dispatch={dispatch}/>} 
                                                  
        
      </Main>
    
    </div>
  );
}

export default App;
