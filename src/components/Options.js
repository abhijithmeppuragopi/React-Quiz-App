export default function Options({question,dispatch,answer}){
    const isAnswerd=answer !==null;
   return <div className="options">
    {question.options.map((option,index)=>
    <button className={`btn btn-option ${isAnswerd? index===question.correctOption ? 'correct':'wrong':''} 
                       ${index ===answer ? 'answer':''}`} 
    onClick={()=>dispatch({type:'ChosenAnswer',payload:index})} 
    key={option}
    disabled={isAnswerd}>
        {option}
        </button>)}
    </div>
     
}