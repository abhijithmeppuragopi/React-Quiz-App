export default function NextQuestion({dispatch,answer,index,noofquestions}){
    if(answer===null) return
     
   if(index+1!==noofquestions)
        {
        return <button className="btn btn-ui" onClick={()=>dispatch({type:'NextQuestion'})}>Next Question</button>
}else{
    return <button className="btn btn-ui" onClick={()=>dispatch({type:'Finished'})}>Finish Quiz</button>

}}