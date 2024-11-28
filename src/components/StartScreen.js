export default function StartScreen({questions,dispatch}){
    // console.log(questions.questions.length);
    return <div className="start">
        <h2>Welcome to the React quiz</h2>
        <h3>{questions} questions to test your react mastery</h3>
        <button className="btn btn-ui"onClick={()=>dispatch({type:'Start'})}>Let's Start</button>
    </div>
}