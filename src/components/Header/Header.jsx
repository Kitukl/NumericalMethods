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
				Не лінійні рівняння
			</button>
		</nav>
	)
}
