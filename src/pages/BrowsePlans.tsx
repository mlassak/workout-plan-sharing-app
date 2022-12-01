import { Box, Button, Typography } from '@mui/material';
import {
	Firestore,
	getDoc,
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
import { WorkoutPlan, WorkoutPlanMetadata, WorkoutPlanWithId } from '../types';
import { workoutPlanCollection } from '../utils/firebase';

const BrowsePlans: FC = () => {
	const [plans, setPlans] = useState<WorkoutPlanWithId[]>([]);
	const [lastVisible, setLastVisible] = useState<
		QueryDocumentSnapshot<WorkoutPlan> | undefined
	>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isEmpty, setIsEmpty] = useState<boolean>(false);

	usePageTitle('Browse');

	const planCards = useMemo(
		() =>
			plans
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
		[plans]
	);

	useEffect(() => {
		const fetchPlans = async () => {
			setIsLoading(true);

			const data = await getDocs(
				query(
					workoutPlanCollection,
					orderBy('createdAt', 'desc'),
					limit(PAGE_ITEM_COUNT)
				)
			);

			const plansData = data.docs.map(
				planDoc => ({ ...planDoc.data(), id: planDoc.id } as WorkoutPlanWithId)
			);

			if (data.docs.length < PAGE_ITEM_COUNT) {
				setIsEmpty(true);
			}

			if (data.docs.length === 0) {
				setIsLoading(false);
				return;
			}

			if (data.docs.length === PAGE_ITEM_COUNT) {
				const last = data.docs[data.docs.length - 1];
				setLastVisible(last);
			}

			setPlans(plansData);
			setIsLoading(false);
		};

		fetchPlans();
	}, []);

	const fetchMorePlans = async () => {
		setIsLoading(true);

		const data = await getDocs(
			query(
				workoutPlanCollection,
				orderBy('createdAt', 'desc'),
				startAfter(lastVisible),
				limit(PAGE_ITEM_COUNT)
			)
		);

		const newPlansData = data.docs.map(
			planDoc => ({ ...planDoc.data(), id: planDoc.id } as WorkoutPlanWithId)
		);

		if (data.docs.length < PAGE_ITEM_COUNT) {
			setIsEmpty(true);
		}

		if (data.docs.length === 0) {
			setIsLoading(false);
			return;
		}

		if (data.docs.length === PAGE_ITEM_COUNT) {
			const last = data.docs[data.docs.length - 1];
			setLastVisible(last);
		}

		setPlans(prevPlans => [...prevPlans, ...newPlansData]);
		setIsLoading(false);
	};

	if (isLoading) {
		return <Typography>Loading plans...</Typography>;
	}

	return (
		<>
			<Typography>Workout plans:</Typography>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>{planCards}</Box>
			{!isLoading && !isEmpty && (
				<Button variant="outlined" onClick={fetchMorePlans}>
					Get more
				</Button>
			)}
			{/* <Typography>
				No more plans available, feel free to sign in and create one!
			</Typography> */}
		</>
	);
};

export default BrowsePlans;
