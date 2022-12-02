import { Delete } from '@mui/icons-material';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	IconButton,
	InputLabel,
	Select,
	TextField,
	Typography
} from '@mui/material';
import { FC, useEffect, useState } from 'react';

import useField from '../../../hooks/useField';
import { Exercise, ExerciseVolume } from '../../../types';

import { validateNumericInput } from './CreatePlanForm';
import { validateExercise } from './WorkoutSessionForm';

type ExerciseFormProps = {
	elemIndex: string;
	exercise: Exercise;
	isLocked: boolean;
	onUpdate: (updatedExercise?: Exercise) => void;
};

const ExerciseForm: FC<ExerciseFormProps> = ({
	elemIndex,
	exercise,
	isLocked,
	onUpdate
}) => {
	const [exerciseName, exerciseNameProps] = useField(
		`${elemIndex}-exercise-name`,
		true,
		'Required'
	);

	const [repRangeDisabled, setRepRangeDisabled] = useState<boolean>(true);
	const [repRangeLowerBound, repRangeLowerBoundProps] = useField(
		`${elemIndex}-reps-lower-bound`,
		true,
		'Required',
		validateNumericInput
	);
	const [repRangeUpperBound, repRangeUpperBoundProps] = useField(
		`${elemIndex}-reps-upper-bound`,
		true,
		'Required',
		validateNumericInput
	);

	const [setsRangeDisabled, setSetsRangeDisabled] = useState<boolean>(true);
	const [setsRangeLowerBound, setsRangeLowerBoundProps] = useField(
		`${elemIndex}-reps-lower-bound`,
		true,
		'Required',
		validateNumericInput
	);
	const [setsRangeUpperBound, setsRangeUpperBoundProps] = useField(
		`${elemIndex}-reps-upper-bound`,
		true,
		'Required',
		validateNumericInput
	);

	const [_, setExerciseObj] = useState<Exercise>(exercise);

	useEffect(() => {
		updateExercise();
	}, [
		exerciseName,
		repRangeDisabled,
		repRangeLowerBound,
		repRangeUpperBound,
		setsRangeDisabled,
		setsRangeLowerBound,
		setsRangeUpperBound
	]);

	const updateExercise = () => {
		const updatedExerciseObj: Exercise = {
			name: exerciseName,
			reps: {
				usesRange: !repRangeDisabled,
				values: {
					min: Number(repRangeLowerBound),
					max: Number(repRangeUpperBound)
				}
			},
			sets: {
				usesRange: !setsRangeDisabled,
				values: {
					min: Number(setsRangeLowerBound),
					max: Number(setsRangeUpperBound)
				}
			}
		};

		setExerciseObj(updatedExerciseObj);
		onUpdate(updatedExerciseObj);
	};

	const removeExercise = () => {
		onUpdate();
	};

	return (
		<Card sx={{ display: 'flex', flexDirection: 'column' }}>
			<CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
				<TextField
					label="Exercise name"
					placeholder="Enter exercise name"
					{...exerciseNameProps}
					type={`${elemIndex}-exercise-name`}
					disabled={isLocked}
					sx={{ marginBottom: '0.2rem' }}
				/>
				<Box sx={{ display: 'flex' }}>
					<TextField
						label={repRangeDisabled ? 'Reps' : 'Min'}
						{...repRangeLowerBoundProps}
						type={`${elemIndex}-reps-lower-bound`}
						disabled={isLocked}
						sx={{ flexGrow: '1' }}
					/>
					{!repRangeDisabled ? (
						<TextField
							label="Max"
							{...repRangeUpperBoundProps}
							type={`${elemIndex}-reps-upper-bound`}
							disabled={isLocked}
							sx={{ flexGrow: '1', marginLeft: '0.2rem' }}
						/>
					) : null}
					<FormGroup sx={{ marginLeft: '0.2rem' }}>
						<FormControlLabel
							control={
								<Checkbox
									onChange={() => setRepRangeDisabled(state => !state)}
									disabled={isLocked}
								/>
							}
							label="Use rep range"
						/>
					</FormGroup>
				</Box>
				<Box sx={{ display: 'flex' }}>
					<TextField
						label={setsRangeDisabled ? 'Sets' : 'Min'}
						{...setsRangeLowerBoundProps}
						type={`${elemIndex}-sets-lower-bound`}
						disabled={isLocked}
						sx={{ flexGrow: '1' }}
					/>
					{!setsRangeDisabled ? (
						<TextField
							label="Max"
							{...setsRangeUpperBoundProps}
							type={`${elemIndex}-sets-upper-bound`}
							disabled={isLocked}
							sx={{ flexGrow: '1', marginLeft: '0.2rem' }}
						/>
					) : null}
					<FormGroup sx={{ marginLeft: '0.2rem' }}>
						<FormControlLabel
							control={
								<Checkbox
									onChange={() => setSetsRangeDisabled(state => !state)}
									disabled={isLocked}
								/>
							}
							label="Use set range"
						/>
					</FormGroup>
				</Box>
			</CardContent>
			<CardActions sx={{ display: 'flex' }}>
				{/* {locked ? (
					<Button
						onClick={() => {
							setLocked(false);
						}}
					>
						Edit exercise
					</Button>
				) : (
					<Button
						onClick={() => {
							updateExercise();
						}}
						disabled={locked}
					>
						Confirm exercise
					</Button>
				)} */}
				<IconButton onClick={removeExercise} disabled={isLocked}>
					<Delete />
					<Typography>Delete exercise</Typography>
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default ExerciseForm;
