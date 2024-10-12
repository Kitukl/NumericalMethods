import Neuton from '../Not_Lineal/Neuton/Neuton.jsx'
import './Simple_Iteration/Simple_Iteration.jsx'
import Simple_Iteration from './Simple_Iteration/Simple_Iteration.jsx'
import './Not_Lineal.scss'

function Not_Lineal() {
	return (
		<div className='global'>
			<aside>
				<button className='asside__button'>
					<a href='#iteration'>Метод простої ітерації</a>
				</button>
				<button className='asside__button'>
					<a href='#neuton'>Метод Ньютона</a>
				</button>
			</aside>
			<main className='not_lineal__main'>
				<div className='iteration__method'>
					<h1 id='iteration'>Ітераційний метод</h1>
					<Simple_Iteration />
					<h1 id='neuton'>Метод Ньютона</h1>
					<Neuton />
				</div>
			</main>
		</div>
	)
}

export default Not_Lineal
