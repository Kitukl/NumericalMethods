import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './App.scss'
import { Gaus } from './Gaus/Gaus.jsx'
import { Header } from './Header/Header.jsx'

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
		],
	},
])

export function App() {
	return <RouterProvider router={router} />
}
