import React from 'react'

const Modal = ({ onClose, results, data }) => {
	
	return (
		<div className='modal is-active'>
			<div className="card">
          </div>
          <div className='content'></div>
			<div className='content'>
				<div className='modal-background' onClick={onClose}></div>
				<div className='modal-card'>
					<header className='modal-card-head'></header>
					
					<section className='modal-card-body content'>
						<ul>
							{results.map((result, i) => (
								<li key={i} className='mb-6'>
									<p>
										<strong>{result.q}</strong>
									</p>
									<p
										className={
											result.a === data[i+7].answer
												? 'has-background-success has-text-white p-2'
												: 'has-background-danger has-text-white p-2'
										}
									>
										<strong>Твой ответ:</strong>
										{result.a}
									</p>
									{result.a !== data[i+7].answer && (
										<p className='has-background-link has-text-white p-2'>
											<strong>Правильный ответ</strong>
											{data[i+7].answer}
										</p>
									)}
									{
										<p className='has-background-link has-text-white p-2'>
											<strong>Цытаты великих людей: </strong>
											{data[i+7].answer2}
										</p>
									}
								</li>
							))}
						</ul>
						
					</section>
					
				</div>
			</div>
		</div>
	)
}

export default Modal
