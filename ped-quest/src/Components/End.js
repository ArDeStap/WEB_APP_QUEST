import React, { useEffect, useState } from 'react';

import { formatTime } from '../utils';

const End = ({ results, data, onReset, onAnswersCheck, time, onEnd, answA, answB, setAnswA, setAnswB}) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const concl1 = "Вы выбрали большинство ответов “А” (творческий и командный тип), это может указывать на вашу способность работать в команде и быть руководителем. Возможные профессии могут включать в себя менеджер проектов, рекламный агент, творческий писатель, редактор, журналист, учитель.Однако, помните, что это - только общая ориентация. Всегда старайтесь учесть свои собственные интересы, цели и страсти при выборе карьерного пути. ";
  const concl2 = "Вы выбрали большинство ответов “В” (технический и автономный тип), это может указывать на то, что вы предпочитаете работать самостоятельно и имеете навыки в применении технологий. Возможные профессии могут включать программиста, инженера, аналитика данных, научного исследователя, фрилансера. Однако, помните, что это - только общая ориентация. Всегда старайтесь учесть свои собственные интересы, цели и страсти при выборе карьерного пути. ";

  useEffect(() => {
    let correct = 0;
    results.forEach((result, index) => {
      
      if(result.a === data[index+7].answer) {
        
        correct=correct+1;
        
      }
    });
    
    setCorrectAnswers(correct);
    // eslint-disable-next-line
  }, []);


  function ShowResult() {
    if(answA >= answB) {
     
      return concl1
    } else {
      
      return concl2
    }
    
  }

  return(
    <div>
      <div className="card">
          </div>
          <div className='content'>
            <h1 className=''>Твои результаты</h1><br/>
          <p>Результаты по первой части квеста: <br/>{ShowResult()}</p><br/>
          <p>Результаты по второй части квеста: <br/></p>
          <p>{correctAnswers} of {data.length-7}</p>
          <p><strong><center>{Math.floor((correctAnswers / (data.length-7)) * 100)}%</center></strong></p>
          <p><center><strong>Your time:</strong> {formatTime(time)}</center></p>
          <center><button className="button is-info mr-2" onClick={onAnswersCheck}>Проверить ответы</button></center>
          <center><button className="button is-success" onClick={onReset}>Попробовать снова</button></center>
          <center><button className="button is-end" onClick={onEnd(correctAnswers)}>Отправить ответы</button></center>
        </div>
    </div>
  );
}

/*<h3>Your results</h3>
<p>{correctAnswers} of {data.length}</p>
<p><strong><center>{Math.floor((correctAnswers / data.length) * 100)}%</center></strong></p>
<p><center><strong>Your time:</strong> {formatTime(time)}</center></p>
<center><button className="button is-info mr-2" onClick={onAnswersCheck}>Check your answers</button></center>*/

export default End;