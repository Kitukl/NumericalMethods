import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './App.scss'
import { Gaus } from './Gaus/Gaus.jsx'
import { Header } from './Header/Header.jsx'
import Not_Lineal from './Not_lineal/Not_Lineal.jsx'

const Layout = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Gaus />,
			},
			{
				path: '/not_lineal',
				element: <Not_Lineal />,
			},
		],
	},
])

export function App() {
	return <RouterProvider router={router} />
}
