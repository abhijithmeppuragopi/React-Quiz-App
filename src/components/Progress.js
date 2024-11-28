export default function Progress({index,noofquestions,points,totalpoints,answer}){
    return <header className="progress">
        <progress max={noofquestions} value={index+(Number(answer!==null))}></progress>
        <p>{index+1}/<strong>{noofquestions}</strong></p>
        <p><strong>{points}</strong>/{totalpoints}</p>

    </header>
}    