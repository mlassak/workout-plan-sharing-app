import { useParams } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { workoutPlanDocument } from '../utils/firebase';
import usePageTitle from '../hooks/usePageTitle';
import { WorkoutPlanWithId } from '../types';
import WorkoutPlanDetailCard from '../components/workout-plans/workout-detail/WorkoutPlanDetailCard';
// import useLoggedInUser from '../hooks/useLoggedInUser';

const Home = () => {
	usePageTitle('Plan view');
	// const user = useLoggedInUser();

	const params = useParams();

	console.log(params);

	const [plan, setPlan] = useState<WorkoutPlanWithId>();

	useEffect(() => {
		const fetchPlanDetails = async () => {
			if (params.planID !== undefined) {
				const data = await getDoc(workoutPlanDocument(params.planID));
				const plan = { ...data.data(), id: data.id } as WorkoutPlanWithId;
				console.log(plan);
				setPlan(plan);
			}
		};

		fetchPlanDetails();
	}, []);

	return (
		<>
			{!!plan && <WorkoutPlanDetailCard {...plan} />}
			{!plan && <h1>Loading the plan...</h1>}
		</>
	);
};

export default Home;
