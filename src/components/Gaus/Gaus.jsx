import { useState } from 'react'
import './Gaus.scss'

export function Gaus() {
	const [size, setSize] = useState(null)
	const [matrix, setMatrix] = useState([])
	const [equals, setEquals] = useState([])
	const [mat, setMat] = useState('')
	const [equal, setEqual] = useState('')

	const handleClick = () => {
		const numSize = parseInt(size)
		if (isNaN(numSize) || numSize <= 0) alert('Введіть число!')

		const tempMatrix = []
		for (let i = 0; i < numSize; i++) {
			tempMatrix.push(Array(numSize).fill(0))
		}
		setMatrix(tempMatrix)

		const tempEquals = Array(numSize).fill(0)
		setEquals(tempEquals)
	}

	const printMatrix = matrix => {
		const rows = []
		for (let i = 0; i < matrix.length; i++) {
			const cells = []
			for (let j = 0; j < matrix[i].length; j++) {
				cells.push(
					<span className='cells' key={j}>
						{matrix[i][j] || '-'}
					</span>
				)
			}
			rows.push(
				<p className='rows' key={i}>
					{cells}
				</p>
			)
		}
		return rows
	}

	const printEquals = equals => {
		const rows = []
		for (let i = 0; i < equals.length; i++) {
			rows.push(
				<p className='rows' key={i}>
					{equals[i] || '0'}
				</p>
			)
		}
		return rows
	}

	const validationEqual = () => {
		if (equal.length > size * 2 - 1) {
			alert('Рядок введений з 3 поля є задовгим')
			return
		}

		const temp = equal.split(',')
		if (temp.length < size) {
			alert('Рядок введений з 3 поля є закоротким')
			return
		}
		setEquals(temp)
	}

	const validationMatrix = () => {
		const temp = mat.split(',')

		if (temp.length !== size * size) {
			alert('Неправильно задано дані з 2 поля (неправильна довжина рядка)')
			return
		}

		const tempMatrix = []

		for (let i = 0; i < size; i++) {
			const rows = []
			for (let j = 0; j < size; j++) {
				rows.push(temp[i * size + j])
			}
			tempMatrix.push(rows)
		}
		setMatrix(tempMatrix)
	}

	const gausMethod = (matrix, equals) => {}

	return (
		<main>
			<h1>Реалізація методу Гауса</h1>
			<div className='wrap'>
				<section>
					<form>
						<div className='inputs'>
							<label htmlFor='matrix-size'>
								Введіть кількість розмір матриці (1 число)
							</label>
							<input
								onChange={e => {
									setSize(e.target.value)
								}}
								type='text'
								name='matrix-size'
							/>
						</div>

						<div className='inputs'>
							<label htmlFor='matrix-size'>
								Введіть значення біля невідомих (по 1)
							</label>
							<input
								type='text'
								name='elements'
								onChange={e => setMat(e.target.value)}
							/>
						</div>
						<div className='inputs'>
							<label htmlFor='matrix-size'>
								Введіть значення після `=` (по 1)
							</label>
							<input
								type='text'
								name='elements'
								onChange={e => setEqual(e.target.value)}
							/>
						</div>
					</form>
				</section>
				<div className='enter-buttons'>
					<button className='enter-button' onClick={handleClick}>
						Ввести
					</button>
					<button className='enter-button' onClick={validationMatrix}>
						Ввести
					</button>
					<button className='enter-button' onClick={validationEqual}>
						Ввести
					</button>
				</div>
			</div>
			<button className='solve-button'>Розв'язати систему рівнянь</button>
			<div className='visual-container'>
				<div className='matrix'>{printMatrix(matrix)}</div>
				<span className='equal'>
					{matrix.length !== 0 && equals.length !== 0 ? '=' : ''}
				</span>
				<div className='matrix'>{printEquals(equals)}</div>
			</div>
		</main>
	)
}
