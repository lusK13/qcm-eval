import React, { useContext } from "react";
import "../App.css";
import { ScoresContext } from "../reducer/scores";

const Resultat = () => {
  const [state] = useContext(ScoresContext);
  const { scores, score, tableauQCM } = state;

  //transforme l'objet des questions en array pour le parcourir plus facilement
  const questionsArray = Object.entries(tableauQCM);
  //   on récupère le nombre de question pour aficher le score (ex: 5/5)
  const lengthQuestions = questionsArray.length;

  return (
    <div className='App'>
      <p>
        {/* si le score est égale au nombre de questions alors on félicite l'utilisateur */}
        {score == lengthQuestions && "BRAVO!! C'est un sans faute "}
        {/* et on donne le score dans tous les cas*/}
        votre score est de {score} / {lengthQuestions}
      </p>
        {/* on boucle sur les questions */}
      {questionsArray.map((question, i) => (
        <React.Fragment key={i}>
            {/* si le score de la question i est égale à 1 alors on affiche "BRAVO.." */}
          {scores[i] == 1 ? (
            <div className='reponsejuste'>
              <p>{question[1].title}</p>
              <p>
                Bravo la reponse était bien : <br />"
                {question[1].choices[question[1].response]}"
              </p>
            </div>
          ) : (     //sinon on affiche "DOMMAGE.."
            <div className='reponsefausse'>
              <p>{question[1].title}</p>
              <p>
                Dommage la bonne réponse était : <br />"
                {question[1].choices[question[1].response]}".
                <br /> {question[1].feedback}
              </p>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Resultat;
