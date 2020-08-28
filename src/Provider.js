import React from 'react';

import {initialState, reducer, ScoresContext} from './reducer/scores.js'
import questions from "./questions";


const Provider = ({ children }) => {

    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {

        dispatch({
            type: 'INIT', tableauQCM: questions
        })
    }, []);

    

    return (
        <ScoresContext.Provider value={[state, dispatch]}>
            {children}
        </ScoresContext.Provider>
    )
}

export default Provider;