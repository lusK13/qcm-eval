import React, { createContext } from "react";

export const ScoresContext = React.createContext({});

export const initialState = {
  scores: [],
  score: "",
  finish: false,
  tableauQCM: "",
  message: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        tableauQCM: action.tableauQCM,
      };

    case "RETOUR_QCM":
      //target du form
      const retourQCM = action.retourQCM;

      //on récupère le questionnaire sous format array
      const tableauQCM = Object.entries(state.tableauQCM);

      //nombre de question
      const QCMLength = tableauQCM.length;

      const scores = []; //pour push 1 ou zero (vrai ou faux)
      let score = 0; //score cumulé de chaques questions

      //boucle sur le nombre de question
      for (let i = 0; i < QCMLength; i++) {
        //si les select sont bien renseigné
        if (retourQCM[i].value) {
          console.log(retourQCM[i].value);
          // si la valeur rentré dans le select est la même que la reponse du
          // questionnaire alors on push 1 dans scores et on incrémente 1 au score
          if (retourQCM[i].value == tableauQCM[i][1].response) {
            scores.push(1);
            score++;
          }
          //sinon on push zéro dans le array scores et on n'incrémente pas le score
          else scores.push(0);
        } else {
          // sinon si les bouton radio ne sont pas renseigné on envoi le message d'erreur
          if (!retourQCM[i].querySelector("input:checked"))
            return {
              ...state,
              message: "vous devez répondre à toutes les questions",
            };
          // si la valeur rentré dans le bouton radio est la même que la reponse du
          // questionnaire alors on push 1 dans scores et on incrémente 1 au score

          if (
            retourQCM[i].querySelector("input:checked").value ==
            tableauQCM[i][1].response
          ) {
            scores.push(1);
            score++;
          }
          //sinon on push zéro dans le array scores et on n'incrémente pas le score
          else scores.push(0);
        }
      }
      //on return (si pas d'erreur) le array scores, le score total, et on indique que le
      //qcm est fini d'être rempli
      return {
        ...state,
        scores: scores,
        score: score,
        finish: true,
      };

    default:
      return state;
  }
};
