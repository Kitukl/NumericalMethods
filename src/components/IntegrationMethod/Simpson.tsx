import { evaluate } from 'mathjs'
import React, { useState } from 'react'

const Simpson: React.FC = () => {
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

	const SimpsonCalculate = () => {
		const values = createInterval()
		if (!values || n <= 0 || n % 2 !== 0) {
			alert('Введіть коректні межі та парну кількість відрізків')
			return
		}
		const [a, b] = values
		const h = (b - a) / n
		let sum = evaluate(func, { x: a }) + evaluate(func, { x: b })
		for (let i = 1; i < n; i++) {
			const x = a + i * h
			const coefficient = i % 2 === 0 ? 2 : 4
			sum += coefficient * evaluate(func, { x })
		}
		const integral = (h / 3) * sum
		setResult(integral)
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
			<button className='solve-button' onClick={SimpsonCalculate}>
				Знайти інтеграл
			</button>
			{result && <div className='result'>інтеграл: {result}</div>}
		</div>
	)
}

export default Simpson
