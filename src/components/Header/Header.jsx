import { useNavigate } from 'react-router-dom'
import './Header.scss'

export function Header() {
	const navigate = useNavigate()

	return (
		<nav>
			<button className='nav__buttons' onClick={() => navigate('/')}>
				Метод Гауса
			</button>
			<button className='nav__buttons' onClick={() => navigate('/not_lineal')}>
				Нелінійні рівняння
			</button>
			<button
				className='nav__buttons'
				onClick={() => navigate('/interpolation')}
			>
				Інтерполяція
			</button>
			<button className='nav__buttons' onClick={() => navigate('/integration')}>
				Чисельне інтегрування
			</button>
		</nav>
	)
}
