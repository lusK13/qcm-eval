import React, {createContext} from 'react';


export const ScoresContext = React.createContext({});


export const initialState = {
    scores: [],
    score:'',
    finish:false,
    tableauQCM:'',
    message:''
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            return {
                ...state,
                tableauQCM : action.tableauQCM,
                
            }


        case 'RETOUR_QCM':

            const retourQCM = action.retourQCM;
            const tableauQCM = Object.entries(state.tableauQCM)
            const QCMLength = tableauQCM.length
            // console.log(retourQCM)

                // // var valeur = document.querySelector('input[name="test"]:checked').value;


                
                const scores= [];
                let score = 0;
                for(let i = 0; i<QCMLength; i++ ){
                    

                    if(retourQCM[i].value){
                    if(retourQCM[i].value == tableauQCM[i][1].response){
                       scores.push(1)
                       score++
                    }
                    else scores.push(0)
                }
                    else{
                        if(!retourQCM[i].querySelector('input:checked'))
                        return {
                            ...state,
                            message:'vous devez répondre à toutes les questions',
                        }
                        if(retourQCM[i].querySelector('input:checked').value == tableauQCM[i][1].response){
                            scores.push(1)
                            score++
                        }
                        else scores.push(0)

                    }


                    // if(retourQCM[i].value != 'undefined')
                    // console.log(tableauQCM[i])
                }



            // if(!Number(Number(state.score)))
            return {
                ...state,
                scores:scores,
                score:score,
                finish:true
            }
            

        case 'SET_SCORE':
        
            return {
                ...state,
                score: action.score,
                message:''
            }
        


        default:
            return state;
    }
}

