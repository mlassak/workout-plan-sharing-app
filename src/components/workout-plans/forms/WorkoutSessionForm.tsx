import { Box, IconButton, Paper, TextField, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Delete } from '@mui/icons-material';

import { Exercise, WorkoutSession } from '../../../types';
import useField from '../../../hooks/useField';

import ExerciseForm from './ExerciseForm';

type WorkoutSessionFormProps = {
	elemIndex: string;
	workoutSession: WorkoutSession;
	onUpdate: (updatedWorkoutSession?: WorkoutSession) => void;
};

const WorkoutSessionForm: FC<WorkoutSessionFormProps> = ({
	elemIndex,
	workoutSession,
	onUpdate
}) => {
	const [workoutSessionName, workoutSessionNameProps] = useField(
		`${elemIndex}-workout-session-name`,
		false
	);
	const [exercises, setExercises] = useState<Exercise[]>([]);

	const [_, setWorkoutSessionObj] = useState<WorkoutSession>(workoutSession); // todo check if this is even useful

	const renderExercises = () => {
		if (exercises.length === 0) {
			return null;
		}

		return exercises.map((exercise, i) => (
			<ExerciseForm
				key={`${elemIndex}-exercise-${i}`}
				elemIndex={`${elemIndex}-exercise-${i}`}
				exercise={exercise}
				onUpdate={updatedExercise => onUpdateExercise(i, updatedExercise)}
			/>
		));
	};

	const onUpdateExercise = (index: number, updatedExercise?: Exercise) => {
		const updatedExercises = [...exercises];

		if (!updatedExercise) {
			updatedExercises.splice(index, 1);
			setExercises(updatedExercises);
			return;
		}

		updatedExercises[index] = { ...updatedExercise };
		setExercises(updatedExercises);
	};

	const addExercise = () => {
		const newExercise: Exercise = {
			name: '',
			reps: {
				usesRange: false,
				values: {
					min: 0,
					max: 0
				}
			},
			sets: {
				usesRange: false,
				values: {
					min: 0,
					max: 0
				}
			}
		};
		setExercises([...exercises, newExercise]);
	};

	useEffect(() => {
		updateWorkoutSession();
	}, [workoutSessionName, exercises]);

	const updateWorkoutSession = () => {
		const updatedWorkoutSession: WorkoutSession = {
			id: workoutSession.id,
			name: workoutSessionName,
			exercises
		};

		setWorkoutSessionObj(updatedWorkoutSession);
		onUpdate(updatedWorkoutSession);
	};

	const removeWorkoutSession = () => {
		onUpdate();
	};

	return (
		<Paper variant="outlined" sx={{ display: 'flex', flexDirection: 'column' }}>
			<TextField
				label="Workout session name"
				placeholder="(Optional) Enter a custom workout session name"
				{...workoutSessionNameProps}
				type={`${elemIndex}-workout-session-name`}
				sx={{ marginBottom: '0.2rem' }}
			/>
			{renderExercises()}
			<IconButton onClick={addExercise}>
				<AddCircleOutlineIcon />
				<Typography>Add exercise</Typography>
			</IconButton>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<IconButton onClick={removeWorkoutSession}>
					<Delete />
					<Typography>Delete workout</Typography>
				</IconButton>
			</Box>
		</Paper>
	);
};

export default WorkoutSessionForm;
