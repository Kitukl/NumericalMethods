import { Tooltip } from 'chart.js'
import { abs, derivative, evaluate, parse } from 'mathjs'
import { useState } from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import './Neuton.scss'

function Neuton() {
	const EPSILON = 0.000001

	const [func, setFunc] = useState('')
	const [interval, setInterval] = useState('')
	const [startValue, setStartValue] = useState(null)
	const [data, setData] = useState([])
	const [result, setResult] = useState(null)
	const [iteration, setIteration] = useState(0)

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

		let z = evaluate(func, { x: i }) / evaluate(deriv.toString(), { x: i })
		while ((abs(z) >= EPSILON) && (iteration <= 5000)) {
			z = evaluate(func, { x: i }) / evaluate(deriv.toString(), { x: i })
			i -= z
			if (i < xValues[0] || i > xValues[1]) {
				i = (xValues[0] + xValues[1]) / 2
			}
			setIteration( prev => prev + 1)
		}

		setResult(i)
		printPlot()
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
					<label htmlFor='matrix-size'>Введіть функцію</label>
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
			<div className='chart'>
				{data.length > 0 && (
					<LineChart width={600} height={400} data={data}>
						<CartesianGrid strokeDasharray='1 0' />
						<XAxis dataKey='x' />
						<YAxis />
						<Tooltip />
						<Line type='monotone' dataKey='y' stroke='#ffffff' />
					</LineChart>
				)}
			</div>
		</div>
	)
}

export default Neuton
