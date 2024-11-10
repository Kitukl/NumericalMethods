import React from 'react'
import Rectangles from './Rectangles'
import Simpson from './Simpson'
import Trapezium from './Trapezium'

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
					<Rectangles />
					<h1 id='trapezium'>Метод трапецій</h1>
					<Trapezium />
					<h1 id='simpson'>Метод Сімпсона</h1>
					<Simpson />
				</div>
			</main>
		</div>
	)
}
export default IntegrationMethod
