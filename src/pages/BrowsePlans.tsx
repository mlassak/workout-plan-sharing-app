import { Box, Button, Typography } from '@mui/material';
import {
	getDocs,
	limit,
	orderBy,
	query,
	QueryDocumentSnapshot,
	startAfter
} from 'firebase/firestore';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import WorkoutPlanCard from '../components/workout-plans/WorkoutPlanCard';
import { PAGE_ITEM_COUNT } from '../const';
import usePageTitle from '../hooks/usePageTitle';
import { WorkoutPlan, WorkoutPlanMetadata } from '../types';
import { workoutPlanCollection } from '../utils/firebase';

const defaultDataQuery = query(
	workoutPlanCollection,
	orderBy('createdAt', 'desc'),
	limit(PAGE_ITEM_COUNT)
);

const BrowsePlans: FC = () => {
	const [displayedPlans, setDisplayedPlans] = useState<WorkoutPlan[]>([]);
	const [isEmpty, setIsEmpty] = useState<boolean>(false);
	const [lastDisplayed, setLastDisplayed] = useState<
		QueryDocumentSnapshot<WorkoutPlan> | undefined
	>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	usePageTitle('Browse');

	const planCards = useMemo(
		() =>
			displayedPlans
				.map(
					plan =>
						({
							name: plan.name,
							author: plan.author,
							difficulty: plan.difficulty,
							workoutsPerWeek: plan.workoutsPerWeek,
							planLength: plan.planLength
						} as WorkoutPlanMetadata)
				)
				.map((plan, i) => <WorkoutPlanCard key={i} {...plan} />),
		[displayedPlans]
	);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

			const fetchedPlanDocs = await getDocs(defaultDataQuery);

			if (fetchedPlanDocs.docs.length === 0) {
				setIsEmpty(true);
				setIsLoading(false);
				return;
			}

			const last = fetchedPlanDocs.docs[fetchedPlanDocs.docs.length - 1];
			const plansToDisplay = fetchedPlanDocs.docs.map(planDoc =>
				planDoc.data()
			);

			setIsEmpty(false);
			setDisplayedPlans(plansToDisplay);
			setLastDisplayed(last);
			setIsLoading(false);
		};

		fetchData().catch(() => {
			setIsLoading(false);
			console.log('Fetching of workout plans failed'); //todo check
		});
	}, []);

	const fetchMorePlans = useCallback(async () => {
		const q = query(
			workoutPlanCollection,
			orderBy('createdAt', 'desc'),
			startAfter(lastDisplayed),
			limit(PAGE_ITEM_COUNT)
		);

		setIsLoading(true);
		const fetchedPlanDocs = await getDocs(q);

		if (fetchedPlanDocs.docs.length === 0) {
			setIsEmpty(true);
			setIsLoading(false);
			return;
		}

		const last = fetchedPlanDocs.docs[fetchedPlanDocs.docs.length - 1];
		const newPlans = fetchedPlanDocs.docs.map(planDoc => planDoc.data());

		setIsEmpty(false);
		setDisplayedPlans(displayedPlans => [...displayedPlans, ...newPlans]);
		setLastDisplayed(last);
		setIsLoading(false);
	}, []);

	if (isLoading) {
		return <Typography>Loading plans...</Typography>;
	}

	return (
		<>
			{!isEmpty && <Typography>Workout plans:</Typography>}
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>{planCards}</Box>
			{!isLoading && !isEmpty && (
				<Button variant="outlined" onClick={fetchMorePlans}>
					Get more
				</Button>
			)}
			{isEmpty && (
				<Typography>
					No more plans available, feel free to sign in and create one!
				</Typography>
			)}
		</>
	);
};

export default BrowsePlans;
