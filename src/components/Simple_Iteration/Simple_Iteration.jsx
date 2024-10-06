import { evaluate } from 'mathjs'
import { useState } from 'react'
import './Simple_Iteration.scss'

function Simple_Iteration() {
	const EPSILON = 0.00001

	const [func, setFunc] = useState('')
	const [interval, setInterval] = useState('')
	const [startValue, setStartValue] = useState(null)
	const [result, setResult] = useState(null)

	const createInterval = () => {
		const arrange = interval.split(',').map(Number)
		if (arrange.length === 2 && arrange.every(num => !isNaN(num))) {
			return arrange
		} else {
			return null
		}
	}

	const simpleIterationMethod = () => {
		const xValues = createInterval()
		const it = 0
		if (!xValues) {
			alert('Неправильний інтервал')
			return
		}

		let x0 = Number(startValue)
		if (isNaN(x0) || x0 < xValues[0] || x0 > xValues[1]) {
			alert('Неправильне початкове значення')
			return
		}

		const psi = 0.5
		const phi = x => x - psi * evaluate(func, { x })

		while (true) {
			const x1 = phi(x0)

			if (Math.abs(x1 - x0) < EPSILON) {
				setResult(x1)
				break
			}

			x0 = x1
			if (x0 < xValues[0] || x0 > xValues[1]) {
				alert('Вихід за межі інтервалу')
				return
			}
		}
	}

	return (
		<div className='container'>
			<form>
				<div className='inputs'>
					<label htmlFor='function'>Введіть рівняння</label>
					<input
						type='text'
						name='function'
						onChange={e => setFunc(e.target.value)}
					/>
				</div>

				<div className='inputs'>
					<label htmlFor='interval'>
						Введіть проміжок для х (наприклад: 0,5, 1,5)
					</label>
					<input
						type='text'
						name='interval'
						onChange={e => setInterval(e.target.value)}
					/>
				</div>
				<div className='inputs'>
					<label htmlFor='startValue'>Введіть початкове значення </label>
					<input
						type='text'
						name='startValue'
						onChange={e => setStartValue(e.target.value)}
					/>
				</div>
			</form>
			<button className='solve-button' onClick={simpleIterationMethod}>
				Розв`язати рівняння
			</button>
			{result && (
				<div>
					<h3>Результат: {result}</h3>
				</div>
			)}
		</div>
	)
}

export default Simple_Iteration
