import React, { useState, useEffect, useRef } from 'react';
import image4 from '../Assets/4.png';
import image5 from '../Assets/5.jpg';
import image1 from '../Assets/1.jpg'
import image2 from '../Assets/2.jpg'
import image3 from '../Assets/3.jpg'

var n = 0;

const Question = ({ data, onAnswerUpdate, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep, setCurrAnswer, answA, answB, setAnswA, setAnswB }) => {
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const radiosWrapper = useRef();
  

  useEffect(() => {
    const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
    if(findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data]);


  const changeHandler = (e) => {
    setSelected(e.target.value);
    if(error) {
      setError('');
    }
  }

  
  const nextClickHandler = (e) => {
    if(selected === '') {
      return setError('Please select one option!');
    }
    if(data.choices.indexOf(selected) === 0){
      setAnswA(answA + 1)
    }else if(data.choices.indexOf(selected) === 1){
      setAnswB(answB + 1)
    }
    if ("answer" in data){
      onAnswerUpdate(prevState => [...prevState, { q: data.question, a: selected }]);
    }
    setSelected('');
    if(activeQuestion < numberOfQuestions - 1) {
      if("conclusions" in data){
        setCurrAnswer(selected)
        onSetStep(4);
      }else{
        onSetActiveQuestion(activeQuestion + 1);
      }
    }else {
      onSetStep(3);
    }
  }

  function steleswith(id) {
		if (activeQuestion === parseInt(id)) {
			return 'imageOn'
		} else {
			return 'BtnHide'
		}
	}
  


  return(
      <div>
      <div className="card">
          </div>
          <div className='content'>
          <center><h2 className="test" text-align='center'>{data.question}</h2><br/>
          <img src={image4} id={(n = '5')} className={steleswith(n)}></img>
			    <img src={image5} id={(n = '1')} className={steleswith(n)}></img>
          <img src={image2} id={(n = '7')} className={steleswith(n)}></img>
			    <img src={image3} id={(n = '8')} className={steleswith(n)}></img>
			    <img src={image1} id={(n = '9')} className={steleswith(n)}></img>
          <div className="control"  ref={radiosWrapper}>
            {data.choices.map((choice, i) => (
              <label className="radio"  key={i}>
                <input type="radio" name="answer" value={choice} onChange={changeHandler} />
                {choice}
              </label>
            ))}

          </div>
          {error && <div className="has-text-danger">{error}</div>}
          <button className="BtnShow" onClick={nextClickHandler}>Next</button></center>
        </div>
      </div>

  );

  
}

export default Question;