export default function FinishScreen({points,totalpoints,highscore,dispatch}){
    const percentage=(points/totalpoints) *100;
    return<> 
    <p className="result"> You scored <strong>{points}</strong> out of {totalpoints} Total:{Math.ceil(percentage)}%  </p>
    <p className="highscore">Highscore : {highscore}</p>
    <button className="btn btn-ui" onClick={()=>dispatch({type:'Restart'})}>Restart Quiz</button>
</>

    
}
