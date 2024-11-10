import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './App.scss'
import { Gaus } from './Gaus/Gaus.jsx'
import { Header } from './Header/Header.jsx'
import IntegrationMethod from './IntegrationMethod/IntegrationMethod.tsx'
import Interpolatian from './Interpolation/Interpolatian.jsx'
import Not_Lineal from './Not_Lineal/Not_Lineal.jsx'

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
			{
				path: 'interpolation',
				element: <Interpolatian />,
			},
			{
				path: 'integration',
				element: <IntegrationMethod />,
			},
		],
	},
])

export function App() {
	return <RouterProvider router={router} />
}
