import { Routes, Route } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import BrowsePlans from '../pages/BrowsePlans';
import CreatePlan from '../pages/CreatePlan';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import PlanDetailView from '../pages/PlanDetailView';

const AppRoutes = () => {
	const user = useLoggedInUser();
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/plans" element={<BrowsePlans />} />
			<Route path="/plan/:planID" element={<PlanDetailView />} />
			{!!user && <Route path="/create" element={<CreatePlan />} />}
			{!user && <Route path="/login" element={<Login />} />}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
export default AppRoutes;
