import React, { useContext } from "react";
import "../App.css";
import { ScoresContext } from "../reducer/scores";
import Resultat from "./Resultat";


const QuestionView = () => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
 
    const retourQCM = e.target.getElementsByClassName('result')
    dispatch({type:'RETOUR_QCM', retourQCM:retourQCM})
  };

  const [state, dispatch] = useContext(ScoresContext);
  const { scores, score, finish, message, tableauQCM } = state;

  const questionsArray = Object.entries(tableauQCM)//transforme l'objet en tableau pour le parcourir plus facilement
  const lengthQuestions = questionsArray.length


if(!finish)
  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <p>{message}</p>
        
            {questionsArray.map((question,i)=><div className='question' key={i}>
            <p>
                {question[1].title}
            </p>
            <p>
              {
                  question[1].type == 'select' ? <select className='result' name={question[0]}><option value="">--Please choose an option--</option>
                  {
                    question[1].choices.map((choice, j)=><option value={j}>{choice}</option>)
                    }</select> :<div className='result'>{
                        question[1].choices.map((choice, j)=><div className='radio'><input type="radio" id={choice.replace(/ /g,"")} value={j} name={question[0]} /><label for={choice.replace(/ /g,"")}>{choice}</label></div>)
                    }</div>
              }
            </p>
            </div>
            )}
        <button>Envoyer QCM</button>
      </form>

    </div>
  );

  else
  return (
    <Resultat/>
  );


};

export default QuestionView;
