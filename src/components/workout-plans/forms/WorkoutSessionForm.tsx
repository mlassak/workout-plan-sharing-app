import {
	Box,
	Button,
	IconButton,
	Paper,
	TextField,
	Typography
} from '@mui/material';
import { FC, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Delete } from '@mui/icons-material';

import { Exercise, ExerciseVolume, WorkoutSession } from '../../../types';
import useField from '../../../hooks/useField';

import ExerciseForm from './ExerciseForm';

type WorkoutSessionFormProps = {
	elemIndex: string;
	workoutSession: WorkoutSession;
	onUpdate: (updatedWorkoutSession?: WorkoutSession) => void;
};

const validateExerciseVolume = (exerciseVolume: ExerciseVolume) => {
	if (exerciseVolume.usesRange) {
		return exerciseVolume.values.min < exerciseVolume.values.max;
	}
	return true;
};

export const validateExercise = (exercise: Exercise) => {
	if (!validateExerciseVolume(exercise.reps)) {
		return false;
	}

	if (!validateExerciseVolume(exercise.sets)) {
		return false;
	}

	return exercise.name.length !== 0;
};

const validateWorkoutSession = (workout: WorkoutSession) => {
	if (workout.exercises.length === 0) {
		alert(
			`Workout session ${
				workout.id + 1
			} does not contain any exercises, please add at least one exercise, or delete the session`
		);
		return false;
	}

	for (let i = 0; i < workout.exercises.length; ++i) {
		if (!validateExercise(workout.exercises[i])) {
			alert(
				`Exercise ${i + 1} in workout session ${
					workout.id + 1
				} contains invalid values`
			);
			return false;
		}
	}

	return true;
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

	const [_, setWorkoutSessionObj] = useState<WorkoutSession>(workoutSession);
	const [locked, setLocked] = useState<boolean>(false);

	const renderExercises = () => {
		if (exercises.length === 0) {
			return null;
		}

		return exercises.map((exercise, i) => (
			<ExerciseForm
				key={`${elemIndex}-exercise-${i}`}
				elemIndex={`${elemIndex}-exercise-${i}`}
				exercise={exercise}
				isLocked={locked}
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

	const updateWorkoutSession = () => {
		setLocked(true);

		const updatedWorkoutSession: WorkoutSession = {
			id: workoutSession.id,
			name: workoutSessionName,
			exercises
		};

		if (!validateWorkoutSession(updatedWorkoutSession)) {
			setLocked(false);
			return;
		}

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
				disabled={locked}
				sx={{ marginBottom: '0.2rem' }}
			/>
			{renderExercises()}
			<IconButton onClick={addExercise} disabled={locked}>
				<AddCircleOutlineIcon />
				<Typography>Add exercise</Typography>
			</IconButton>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				{locked ? (
					<Button
						onClick={() => {
							setLocked(false);
						}}
					>
						Edit workout
					</Button>
				) : (
					<Button
						onClick={() => {
							updateWorkoutSession();
						}}
					>
						Confirm workout
					</Button>
				)}
				<IconButton onClick={removeWorkoutSession}>
					<Delete />
					<Typography>Delete workout</Typography>
				</IconButton>
			</Box>
		</Paper>
	);
};

export default WorkoutSessionForm;
