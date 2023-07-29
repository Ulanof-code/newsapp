import Container from '@mui/material/Container';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header, Footer } from './components';
import { Home, Login, Registration } from './pages';

function App() {
	return (
		<>
			<Header />
			<Container maxWidth='lg'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Registration />} />
				</Routes>
			</Container>
			<Footer></Footer>
		</>
	);
}

export default App;
