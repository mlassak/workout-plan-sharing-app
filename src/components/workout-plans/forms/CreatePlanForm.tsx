import {
	Box,
	Button,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	TextField,
	Typography
} from '@mui/material';
import { addDoc, Timestamp } from 'firebase/firestore';
import { FC, FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import useField from '../../../hooks/useField';
import useLoggedInUser from '../../../hooks/useLoggedInUser';
import { DifficultyLevel, TimeUnit, WorkoutSession } from '../../../types';
import { workoutPlanCollection } from '../../../utils/firebase';
import {
	validateNumericInput,
	validateWorkoutSession
} from '../../../utils/form-validators';

import WorkoutSessionForm from './WorkoutSessionForm';

const CreatePlanForm: FC = () => {
	const [planName, planNameProps] = useField('plan-name', true, 'Required');
	const [difficulty, setDifficulty] = useState<DifficultyLevel>('Beginner');
	const [workoutsPerWeek, workoutsPerWeekProps] = useField(
		'workouts-per-week',
		true,
		'A non-zero, positive numeric value is required',
		validateNumericInput
	);

	const [timeCommitment, timeCommitmentProps] = useField(
		'num-of-units',
		true,
		'A non-zero, positive numeric value is required',
		validateNumericInput
	);

	const [timeUnit, setTimeUnit] = useState<TimeUnit>('unspecified');
	const [description, descriptionProps] = useField(
		'description',
		true,
		'Required'
	);

	const [workoutSessions, setWorkoutSessions] = useState<WorkoutSession[]>([]);

	const [submitError, setSubmitError] = useState<string>();

	const navigate = useNavigate();
	const user = useLoggedInUser();

	const hasValidWorkoutContents = useMemo(() => {
		for (let i = 0; i < workoutSessions.length; ++i) {
			if (!validateWorkoutSession(workoutSessions[i])) {
				return false;
			}
		}
		return true;
	}, [workoutSessions]);

	const renderWorkoutSessions = () => {
		if (workoutSessions.length === 0) {
			return null;
		}

		return workoutSessions.map((workout, i) => (
			<WorkoutSessionForm
				key={`workout-session-${i}`}
				elemIndex={`workout-session-${i}`}
				workoutSession={workout}
				onUpdate={updatedWorkout => onUpdateWorkoutSession(i, updatedWorkout)}
			/>
		));
	};

	const onUpdateWorkoutSession = (
		index: number,
		updatedWorkoutSession?: WorkoutSession
	) => {
		const updatedSessions = [...workoutSessions];

		if (!updatedWorkoutSession) {
			updatedSessions.splice(index, 1);
			setWorkoutSessions(updatedSessions);
			return;
		}

		updatedSessions[index] = { ...updatedWorkoutSession };
		setWorkoutSessions(updatedSessions);
	};

	const addWorkoutSession = () => {
		const newWorkoutSession: WorkoutSession = {
			id: workoutSessions.length,
			exercises: []
		};
		setWorkoutSessions([...workoutSessions, newWorkoutSession]);
	};

	return (
		<Paper
			component="form"
			onSubmit={async (e: FormEvent) => {
				e.preventDefault();
				try {
					if (!user?.email) {
						setSubmitError('You are not signed in');
						return;
					}

					await addDoc(workoutPlanCollection, {
						name: planName,
						author: user?.email,
						difficulty,
						workoutsPerWeek: Number(workoutsPerWeek),
						planLength: {
							numberOfUnits: Number(timeCommitment),
							timeUnit
						},
						description,
						sessions: workoutSessions,
						createdAt: Timestamp.now()
					});
				} catch (err) {
					setSubmitError(
						(err as { message?: string })?.message ?? 'Unknown error occurred'
					);
				}

				navigate('/plans');
			}}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				p: 4,
				gap: 2
			}}
		>
			<Typography variant="h4" component="h2" textAlign="center" mb={3}>
				Create your workout plan
			</Typography>
			<TextField
				label="Plan name"
				placeholder="Enter the name of your workout plan"
				{...planNameProps}
				type="plan-name"
			/>
			<FormControl fullWidth>
				<InputLabel id="difficulty-select-label">Plan difficulty</InputLabel>
				<Select
					labelId="difficulty-select-label"
					id="difficulty-select"
					value={difficulty}
					label="Plan difficulty"
					onChange={(e: SelectChangeEvent) => {
						e.preventDefault();
						setDifficulty(e.target.value as DifficultyLevel);
					}}
				>
					<MenuItem value="Beginner">Beginner</MenuItem>
					<MenuItem value="Intermediate">Intermediate</MenuItem>
					<MenuItem value="Advanced">Advanced</MenuItem>
				</Select>
			</FormControl>
			<Paper sx={{ display: 'flex' }}>
				<TextField
					label={`Number of ${timeUnit !== 'unspecified' ? timeUnit : 'units'}`}
					placeholder={`Enter number of ${timeUnit}`}
					{...timeCommitmentProps}
					type="num-of-units"
					required={timeUnit !== 'unspecified'}
					disabled={timeUnit === 'unspecified'}
					sx={{ flexGrow: 1 }}
				/>
				<FormControl sx={{ flexGrow: 1, marginLeft: '0.3rem' }}>
					<InputLabel id="time-unit-select-label">Time unit</InputLabel>
					<Select
						labelId="time-unit-select-label"
						id="time-unit-select"
						value={timeUnit}
						label="Time unit"
						onChange={(e: SelectChangeEvent) => {
							e.preventDefault();
							setTimeUnit(e.target.value as TimeUnit);
						}}
					>
						<MenuItem value="unspecified">unspecified</MenuItem>
						<MenuItem value="days">days</MenuItem>
						<MenuItem value="weeks">weeks</MenuItem>
						<MenuItem value="months">months</MenuItem>
						<MenuItem value="years">years</MenuItem>
					</Select>
				</FormControl>
			</Paper>
			<TextField
				label="Workouts per week"
				placeholder="Enter number of workouts per week"
				{...workoutsPerWeekProps}
				type="workouts-per-week"
			/>
			<TextField
				label="Description"
				placeholder="Please thorougly describe your workout plan here"
				{...descriptionProps}
				type="description"
				multiline
				maxRows={Infinity}
			/>
			<Paper title="Workout sessions">
				{renderWorkoutSessions()}
				<IconButton onClick={addWorkoutSession}>
					<AddCircleOutlineIcon />
					<Typography sx={{ marginLeft: '0.3rem' }}>
						Add workout session
					</Typography>
				</IconButton>
			</Paper>
			<Box
				sx={{
					display: 'flex',
					gap: 2,
					alignItems: 'center',
					alignSelf: 'flex-end',
					mt: 2
				}}
			>
				{submitError && (
					<Typography
						variant="caption"
						textAlign="right"
						sx={{ color: 'error.main' }}
					>
						{submitError}
					</Typography>
				)}
				<Button
					type="submit"
					variant="outlined"
					disabled={!hasValidWorkoutContents}
				>
					Create plan
				</Button>
			</Box>
		</Paper>
	);
};

export default CreatePlanForm;
