import React from 'react';

const Itogo = ({ data, selected, activeQuestion, onSetStep, onSetActiveQuestion}) => {

  

    function GetAnswer() {
        return selected
    }



    const NextStepHandler = (e) =>{
         
        onSetActiveQuestion(activeQuestion + 1);
        onSetStep(2);
    }

    function CheckConclusion() {
        for( let i in data.choices){
            if(data.choices[i] === selected){
                return data.conclusions[i]
            }
        }

    }


    return(
        <div>
            <div className="card">
          </div>
          <div className='content'>
            
                <h1 className='test'>{GetAnswer()}</h1>
                <p>{CheckConclusion()}</p>
                <button className='BtnShow' onClick={NextStepHandler}><b>Далее</b></button>

            </div>
      </div>
  );


}

export default Itogo;