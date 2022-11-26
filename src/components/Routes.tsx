import { Routes, Route } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
	const user = useLoggedInUser();
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			{!user && <Route path="/login" element={<Login />} />}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
export default AppRoutes;
