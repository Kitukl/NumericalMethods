import { abs, derivative, evaluate, parse } from 'mathjs'
import { useState } from 'react'
import './Neuton.scss'

function Neuton() {
	const EPSILON = 0.000001

	const [func, setFunc] = useState('')
	const [interval, setInterval] = useState('')
	const [startValue, setStartValue] = useState(null)
	const [data, setData] = useState([])
	const [result, setResult] = useState(null)

	const createInterval = () => {
		const arrange = interval.split(',').map(Number)
		if (arrange.length === 2 && arrange.every(num => !isNaN(num))) {
			return arrange
		} else {
			return null
		}
	}

	const NeutonMethod = () => {
		const expr = parse(func)
		const deriv = derivative(expr, 'x')

		const xValues = createInterval()
		let i = Number(startValue)
		if (isNaN(i) || i < xValues[0] || i > xValues[1]) {
			alert('Не правильно задане значення')
			return
		}
		let z = -(evaluate(func, { x: i }) / evaluate(deriv.toString(), { x: i }))
		while (abs(z) >= EPSILON) {
			z = -(evaluate(func, { x: i }) / evaluate(deriv.toString(), { x: i }))
			i += z
		}
		setResult(i)
	}

	const printPlot = () => {
		const temp = []
		const xValues = createInterval()
		for (let i = xValues[0]; i <= xValues[1]; i += 0.5) {
			const yValue = evaluate(func, { x: i })
			temp.push({ x: i, y: yValue })
		}
		setData(temp)
	}

	return (
		<div className='container'>
			<form>
				<div className='inputs'>
					<label htmlFor='matrix-size'>Введіть рівняння</label>
					<input
						type='text'
						name='matrix-size'
						onChange={e => {
							setFunc(e.target.value)
						}}
					/>
				</div>

				<div className='inputs'>
					<label htmlFor='matrix-size'>Введіть проміжок для х</label>
					<input
						type='text'
						name='elements'
						onChange={e => setInterval(e.target.value)}
					/>
				</div>
				<div className='inputs'>
					<label htmlFor='matrix-size'>Введіть початкове значення </label>
					<input
						type='text'
						name='elements'
						onChange={e => setStartValue(e.target.value)}
					/>
				</div>
			</form>
			<div className='enter-buttons'></div>
			<button className='solve-button' onClick={NeutonMethod}>
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

export default Neuton
