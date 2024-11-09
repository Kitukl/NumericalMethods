import React from 'react'

const IntegrationMethod = () => {
	return (
		<div className='global'>
			<aside>
				<button className='asside__button'>
					<a href='#rectangles'>Метод прямокутників</a>
				</button>
				<button className='asside__button'>
					<a href='#trapezium'>Метод трапецій</a>
				</button>
				<button className='asside__button'>
					<a href='#simpson'>Метод Сімпсона</a>
				</button>
			</aside>
			<main className='not_lineal__main'>
				<div className='iteration__method'>
					<h1 id='rectangles'>Метод прямокутників</h1>
					<h1 id='trapezium'>Метод трапецій</h1>
					<h1 id='simpson'>Метод Сімпсона</h1>
				</div>
			</main>
		</div>
	)
}
export default IntegrationMethod
