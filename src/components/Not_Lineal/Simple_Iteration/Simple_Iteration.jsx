import { Tooltip } from 'chart.js'
import { abs, derivative, evaluate, parse } from 'mathjs'
import { useState } from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import './Simple_Iteration.scss'

function Simple_Iteration() {
	const EPSILON = 0.00001

	const [func, setFunc] = useState('')
	const [phi, setPhi] = useState('')
	const [interval, setInterval] = useState('')
	const [result, setResult] = useState(null)
	const [data, setData] = useState([])

	const createInterval = () => {
		const arrange = interval.split(',').map(Number)
		if (arrange.length === 2 && arrange.every(num => !isNaN(num))) {
			return arrange
		} else {
			return null
		}
	}

	const simpleIterationMethod = () => {
		const phiExpr = parse(phi)
		const phiDeriv = derivative(phiExpr, 'x')
		const intervals = createInterval()

		if (!intervals) {
			setResult('Некоректний інтервал')
			return
		}

		let x0 = (intervals[0] + intervals[1]) / 2
		let phiDerivValue = evaluate(phiDeriv.toString(), { x: x0 })

		if (abs(phiDerivValue) >= 1) {
			setResult('Умова збіжності не виконується')
			return
		}

		let x1 = evaluate(phi.toString(), { x: x0 })
		while (abs(x1 - x0) >= EPSILON) {
			x0 = x1
			x1 = evaluate(phi.toString(), { x: x0 })
		}
		setResult(x1)
		plotFunction()
	}

	const plotFunction = () => {
		const intervals = createInterval()
		const temp_data = []
		const step = (intervals[1] - intervals[0]) / 10
		for (let x = intervals[0]; x <= intervals[1]; x += step) {
			const temp = { x: x, y: evaluate(func.toString(), { x: x }) }
			temp_data.push(temp)
		}
		setData(temp_data)
	}

	return (
		<div className='container'>
			<form>
				<div className='inputs'>
					<label htmlFor='function'>Введіть функцію</label>
					<input
						type='text'
						name='function'
						onChange={e => setFunc(e.target.value)}
					/>
				</div>
				<div className='inputs'>
					<label htmlFor='phi'>Введіть функцію фі</label>
					<input
						type='text'
						name='phi'
						onChange={e => setPhi(e.target.value)}
					/>
				</div>
				<div className='inputs'>
					<label htmlFor='interval'>Введіть проміжок для х</label>
					<input
						type='text'
						name='interval'
						onChange={e => setInterval(e.target.value)}
					/>
				</div>
			</form>
			<button className='solve-button' onClick={simpleIterationMethod}>
				Розв`язати рівняння
			</button>
			<div>
				<h3>
					Результат для {func}: {result}
				</h3>
			</div>
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

export default Simple_Iteration
