import { useEffect } from "react"

export default function Timer({secondsremaining,dispatch}){
    const min=Math.floor(secondsremaining/60);
    const sec=secondsremaining%60;
    useEffect(function(){
        const id=setInterval(() => {
            dispatch({type:'Timer'})
            
        }, 1000);
        return ()=> clearInterval(id);
    },[dispatch])
    
    
    return <div className="timer">{min<10 &&'0'}{min}:{sec}</div>
}