import React, { useContext } from "react";
import "../App.css";
import Provider from "../Provider";
import { reducer, ScoresContext } from "../reducer/scores";

const Resultat = () => {
  const [state, dispatch] = useContext(ScoresContext);
  const { scores, score, finish, message, tableauQCM } = state;

  const questionsArray = Object.entries(tableauQCM); //transforme l'objet en tableau pour le parcourir plus facilement
  const lengthQuestions = questionsArray.length;

  return (
    <div className='App'>
      <p>
          {score == lengthQuestions && 'BRAVO!! C\'est un sans faute '}
        votre score est de {score} / {lengthQuestions}
      </p>

      {questionsArray.map((question, i) => (
        <React.Fragment key={i}>
          {scores[i] == 1 ? (
            <div className='reponsejuste'>
              <p>{question[1].title}</p>
              <p>
                Bravo la reponse était bien : <br/>"
                {question[1].choices[question[1].response]}"
              </p>
            </div>
          ) : (
            <div className='reponsefausse'>
              <p>{question[1].title}</p>
              <p>
                Dommage la bonne réponse était : <br/>"
                {question[1].choices[question[1].response]}".
                <br /> {question[1].feedback}
              </p>
            </div>
          )}
        </React.Fragment>
      ))}
      {/* <input type='text' name='score' value={score} onChange={handleChange} /> */}
    </div>
  );
};

export default Resultat;
