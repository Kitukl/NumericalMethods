import './Not_Lineal.scss'

function Not_Lineal() {
	return (
		<div className='global'>
			<aside>
				<button className='asside__button'>
					<a href='#iteration'>Ітераційний метод</a>
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
				</div>
			</main>
		</div>
	)
}

export default Not_Lineal
