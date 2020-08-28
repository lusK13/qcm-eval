import React, { useContext } from "react";
import { ScoresContext } from "./reducer/scores";

import "./App.css";
import QuestionsView from "./components/QuestionsView"
import Resultat from "./components/Resultat";
const App = () => {
  

  const [state] = useContext(ScoresContext);
  const { finish } = state;

  if(!finish)
  return (
      <QuestionsView />
  );
  else
  return (
    <Resultat/>
  );

};

export default App;
