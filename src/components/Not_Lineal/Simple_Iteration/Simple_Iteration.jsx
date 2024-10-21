import { abs, derivative, evaluate, parse } from 'mathjs'
import { useState } from 'react'
import './Simple_Iteration.scss'

function Simple_Iteration() {
	const EPSILON = 0.00001

	const [func, setFunc] = useState('')
	const [startValue, setStartValue] = useState(null)
	const [interval, setInterval] = useState('')
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


	const simpleIterationMethod = () => {
		const intervals = createInterval();
		setIteration(0)

		if (!intervals) {
			setResult('Некоректний інтервал');
			return;
		}

		const phiExpr = parse(`x - (${func})`);
		const phiDeriv = derivative(phiExpr, 'x');

		let maxDerivative = 0;
		for (let x = intervals[0]; x <= intervals[1]; x += 0.01) {
			const derivValue = abs(evaluate(phiDeriv.toString(), { x }));
			if (derivValue > maxDerivative) {
				maxDerivative = derivValue;
			}
		}

		const c = 1 / (maxDerivative)


		const adjustedPhi = (x) => x - c * evaluate(func, { x });

		let x0 = startValue;
		let x1 = adjustedPhi(x0);
		let iteration = 0;

		while ((abs(x1 - x0) >= EPSILON) && (iteration < 5000)) {
			x0 = x1;
			x1 = adjustedPhi(x0);
			setIteration(prev => prev + 1);
			iteration++;
		}

		if (iteration >= 5000) {
			setResult('Метод не збігся за 5000 ітерацій');
		} else {
			setResult(`Корінь рівняння: ${x1}`);
		}
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
					<label htmlFor='interval'>Введіть проміжок для х</label>
					<input
						type='text'
						name='interval'
						onChange={e => setInterval(e.target.value)}
					/>
				</div>
				<div className='inputs'>
					<label htmlFor='function'>Введіть початкове наближення</label>
					<input
						type='text'
						name='function'
						onChange={e => setStartValue(e.target.value)}
					/>
				</div>
			</form>
			<button className='solve-button' onClick={simpleIterationMethod}>
				Розв`язати рівняння
			</button>
			<div>
				<h3>
					Результат для {func}: {result} ({iteration})
				</h3>
			</div>
		</div>
	)
}

export default Simple_Iteration
