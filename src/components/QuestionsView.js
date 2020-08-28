import React, { useContext } from "react";
import "../App.css";
import { ScoresContext } from "../reducer/scores";

const QuestionView = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const retourQCM = e.target.getElementsByClassName("result");
    dispatch({ type: "RETOUR_QCM", retourQCM: retourQCM });
  };

  const [state, dispatch] = useContext(ScoresContext);
  const { scores, score, finish, message, tableauQCM } = state;

  const questionsArray = Object.entries(tableauQCM); //transforme l'objet en tableau pour le parcourir plus facilement
  const lengthQuestions = questionsArray.length;

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <p>{message}</p>

        {/* on bloucle sur le questionnaire, et on récupère les questions, les choix de réponse et le titre des questions */}
        {questionsArray.map((question, i) => (
          <div className='question' key={i}>
            {/* question[0] contient la clé de la question (titre), question[1] contient les questions, réponse, choix ect.. */}
            {/* on affiche les questions */}
            <p>{question[1].title}</p>

            {/* puis les réponses */}
            <p>

                {/* si c'est un select.. */}
              {question[1].type == "select" ? (
                <select className='result' name={question[0]}>
                  <option value=''>--Please choose an option--</option>
                  {question[1].choices.map((choice, j) => (
                    <option key={j} value={j}>
                      {choice}
                    </option>
                  ))}
                </select>
              ) : (     //sinon si c'est un bouton radio..
              
              <div className='result'>
                  {question[1].choices.map((choice, j) => (
                    <div key={j} className='radio'>
                      <input
                        type='radio'
                        // on met le choix de la question dans l'id afin de l'associer au for du label
                        // on enlève les espaces pour être conforme à la norme html
                        id={choice.replace(/ /g, "")}
                        
                        //la valeur équivaut à la position de la réponse (x eme réponse)
                        value={j}
                        // on met le titre de la question afin de lier les boutons radio entre eux
                        name={question[0]}
                      />
                      <label for={choice.replace(/ /g, "")}>{choice}</label>
                    </div>
                  ))}
                </div>
              )}
            </p>
          </div>
        ))}
        <button>Envoyer QCM</button>
      </form>
    </div>
  );
};

export default QuestionView;
