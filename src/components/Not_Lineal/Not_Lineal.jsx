import '../Simple_Iteration/Simple_Iteration.jsx'
import Simple_Iteration from '../Simple_Iteration/Simple_Iteration.jsx'
import './Not_Lineal.scss'

function Not_Lineal() {
	return (
		<div className='global'>
			<aside>
				<button className='asside__button'>
					<a href='#iteration'>Метод простої ітерації</a>
				</button>
				<button className='asside__button'>
					<a href='#iteration'>Метод Ньютона</a>
				</button>
				<button className='asside__button'>
					<a href='#iteration'>Метрд хорд</a>
				</button>
			</aside>
			<main className='not_lineal__main'>
				<div className='iteration__method'>
					<h1 id='iteration'>Ітераційний метод</h1>
					<Simple_Iteration />
				</div>
			</main>
		</div>
	)
}

export default Not_Lineal
