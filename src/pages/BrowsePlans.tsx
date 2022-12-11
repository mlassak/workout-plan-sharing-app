import {
	Grid,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	TextField,
	Typography
} from '@mui/material';
import {
	getDocs,
	limit,
	orderBy,
	query,
	where,
	QueryConstraint,
	QueryDocumentSnapshot,
	startAfter
} from 'firebase/firestore';
import { FC, useEffect, useMemo, useState } from 'react';

import WorkoutPlanCard from '../components/workout-plans/WorkoutPlanCard';
import { PAGE_ITEM_COUNT } from '../const';
import usePageTitle from '../hooks/usePageTitle';
import {
	WorkoutPlan,
	WorkoutPlanMetadataWithId,
	WorkoutPlanWithId,
	DifficultyLevel
} from '../types';
import { workoutPlanCollection } from '../utils/firebase';
import useField from '../hooks/useField';

const BrowsePlans: FC = () => {
	usePageTitle('Browse');

	const [plans, setPlans] = useState<WorkoutPlanWithId[]>([]);
	const [lastVisible, setLastVisible] = useState<
		QueryDocumentSnapshot<WorkoutPlan> | undefined
	>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isEmpty, setIsEmpty] = useState<boolean>(false);

	// Search parameters

	const [author, setAuthor] = useField('author', false);
	const [workoutsPerWeek, setWorkoutsPerWeek] = useField(
		'workoutsPerWeek',
		false
	);
	const [difficulty, setDifficulty] = useState<DifficultyLevel | 'All'>('All');

	// end of search parameters

	const planCards = useMemo(
		() =>
			plans
				.map(
					plan =>
						({
							id: plan.id,
							name: plan.name,
							author: plan.author,
							difficulty: plan.difficulty,
							workoutsPerWeek: plan.workoutsPerWeek,
							planLength: plan.planLength
						} as WorkoutPlanMetadataWithId)
				)
				.map((plan, i) => (
					<Grid item key={i} xs={12} md={6} lg={4} padding="0.5rem">
						<WorkoutPlanCard key={i} {...plan} />
					</Grid>
				)),
		[plans]
	);

	const fetchPlans = async () => {
		setIsLoading(true);

		const custom_qc = prepairQueryConditions();

		const data = await getDocs(
			query(
				workoutPlanCollection,
				...custom_qc,
				orderBy('createdAt', 'desc'),
				limit(PAGE_ITEM_COUNT)
			)
		);

		const plansData = data.docs.map(
			planDoc => ({ ...planDoc.data(), id: planDoc.id } as WorkoutPlanWithId)
		);

		if (plansData.length === 0) {
			setPlans([]);
			setIsLoading(false);
			return;
		}

		if (plansData.length < PAGE_ITEM_COUNT) {
			setIsEmpty(true);
		}

		if (plansData.length === PAGE_ITEM_COUNT) {
			const last = data.docs[data.docs.length - 1];
			setIsEmpty(false);
			setLastVisible(last);
		}

		setPlans(plansData);
		setIsLoading(false);
	};

	useEffect(() => {
		fetchPlans();
	}, []);

	const fetchMorePlans = async () => {
		setIsLoading(true);

		const custom_qc = prepairQueryConditions();

		const data = await getDocs(
			query(
				workoutPlanCollection,
				...custom_qc,
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

	const prepairQueryConditions = (): QueryConstraint[] => {
		let custom_qc: QueryConstraint[] = [];

		if (author?.trim() !== undefined && author?.trim() !== '') {
			custom_qc = [...custom_qc, where('author', '==', author)];
		}

		if (difficulty !== 'All') {
			custom_qc = [...custom_qc, where('difficulty', '==', difficulty)];
		}

		if (!isNaN(Number(workoutsPerWeek)) && Number(workoutsPerWeek) > 0) {
			custom_qc = [
				...custom_qc,
				where('workoutsPerWeek', '==', Number(workoutsPerWeek))
			];
		}
		return custom_qc;
	};

	if (isLoading) {
		return <Typography>Loading plans...</Typography>;
	}

	return (
		<>
			<Paper
				component="form"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					p: 4,
					gap: 2
				}}
			>
				<Typography variant="h4" component="h2" textAlign="center" mb={3}>
					Search for workout plans based on your preferences
				</Typography>
				<TextField
					label="Author"
					placeholder="Enter the name of the workout plan's author"
					{...setAuthor}
					type="author"
				/>
				<TextField
					label="Workouts per week"
					placeholder="Number of workouts per week"
					{...setWorkoutsPerWeek}
					type="workoutsPerWeek"
				/>
				<FormControl fullWidth>
					<InputLabel id="difficulty-select-label">Plan difficulty</InputLabel>
					<Select
						defaultValue="All"
						labelId="difficulty-select-label"
						id="difficulty-select"
						value={difficulty}
						label="Plan difficulty"
						onChange={(e: SelectChangeEvent) => {
							e.preventDefault();
							setDifficulty(e.target.value as DifficultyLevel);
						}}
					>
						<MenuItem value="All">All</MenuItem>
						<MenuItem value="Beginner">Beginner</MenuItem>
						<MenuItem value="Intermediate">Intermediate</MenuItem>
						<MenuItem value="Advanced">Advanced</MenuItem>
					</Select>
				</FormControl>
				<Button onClick={fetchPlans}>Submit</Button>
			</Paper>
			<Typography>Workout plans:</Typography>
			<Grid container spacing={2}>
				{planCards}
			</Grid>
			{!isLoading && (
				<Button variant="outlined" onClick={fetchMorePlans} disabled={isEmpty}>
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
