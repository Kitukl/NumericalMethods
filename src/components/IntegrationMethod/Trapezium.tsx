import { evaluate } from 'mathjs'
import React, { useState } from 'react'

const Trapezium: React.FC = () => {
	const [interval, setInterval] = useState<string>('')
	const [n, setN] = useState<number>(0)
	const [func, setFunc] = useState<string>('')
	const [result, setResult] = useState<number>(0)

	const createInterval = () => {
		const arrange = interval.split(',').map(Number)
		if (arrange.length === 2 && arrange.every(num => !isNaN(num))) {
			return arrange
		} else {
			alert('Введіть правильні межі')
			return 0
		}
	}

	const TrapeziumCalculate = () => {
		const epsilon = 0.000001
		const values = createInterval()
		if (!values || n <= 0) {
			alert('Введіть коректні межі та кількість прямокутників')
			return
		}

		const [a, b] = values
		const width = (b - a) / n
		let sum = 0
		for (let i = 0; i <= n; i++) {
			const x = a + i * width
			const fx = evaluate(func, { x })
			sum += i === 0 || i === n ? fx * 0.5 : fx
		}

		if (width * sum < epsilon) setResult(0)
		else setResult(width * sum)
	}

	return (
		<div className='container'>
			<form>
				<div className='inputs'>
					<label htmlFor='matrix-size'>Введіть функцію</label>
					<input
						type='text'
						name='matrix-size'
						onChange={e => setFunc(e.target.value)}
					/>
				</div>

				<div className='inputs'>
					<label htmlFor='matrix-size'>Введіть порміжок</label>
					<input
						type='text'
						name='elements'
						onChange={e => setInterval(e.target.value)}
					/>
				</div>
				<div className='inputs'>
					<label htmlFor='matrix-size'>Введіть кількість прямокутників</label>
					<input
						type='text'
						name='elements'
						onChange={e => setN(Number(e.target.value))}
					/>
				</div>
			</form>
			<div className='enter-buttons'></div>
			<button className='solve-button' onClick={TrapeziumCalculate}>
				Знайти інтеграл
			</button>
			{result && <div className='result'>інтеграл: {result}</div>}
		</div>
	)
}

export default Trapezium
