import { Delete } from '@mui/icons-material';
import {
	Box,
	Card,
	CardActions,
	CardContent,
	Checkbox,
	FormControlLabel,
	FormGroup,
	IconButton,
	TextField,
	Typography
} from '@mui/material';
import { FC, useEffect, useState } from 'react';

import useField from '../../../hooks/useField';
import { Exercise } from '../../../types';
import { validateNumericInput } from '../../../utils/form-validators';

type ExerciseFormProps = {
	elemIndex: string;
	bgColor: string;
	onUpdate: (updatedExercise?: Exercise) => void;
};

const ExerciseForm: FC<ExerciseFormProps> = ({
	elemIndex,
	bgColor,
	onUpdate
}) => {
	const [exerciseName, exerciseNameProps] = useField(
		`${elemIndex}-exercise-name`,
		true,
		'Required'
	);

	const [repRangeDisabled, setRepRangeDisabled] = useState<boolean>(true);
	const [repRangeMin, repRangeMinProps] = useField(
		`${elemIndex}-reps-lower-bound`,
		true,
		'Required',
		validateNumericInput
	);
	const [repRangeMax, repRangeMaxProps] = useField(
		`${elemIndex}-reps-upper-bound`,
		true,
		'Required',
		validateNumericInput
	);

	const [setsRangeDisabled, setSetsRangeDisabled] = useState<boolean>(true);
	const [setsRangeMin, setsRangeMinProps] = useField(
		`${elemIndex}-reps-lower-bound`,
		true,
		'Required',
		validateNumericInput
	);
	const [setsRangeMax, setsRangeMaxProps] = useField(
		`${elemIndex}-reps-upper-bound`,
		true,
		'Required',
		validateNumericInput
	);

	useEffect(() => {
		updateExercise();
	}, [
		exerciseName,
		repRangeDisabled,
		repRangeMin,
		repRangeMax,
		setsRangeDisabled,
		setsRangeMin,
		setsRangeMax
	]);

	const updateExercise = () => {
		const updatedExerciseObj: Exercise = {
			name: exerciseName,
			reps: {
				usesRange: !repRangeDisabled,
				values: {
					min: Number(repRangeMin),
					max: Number(repRangeMax)
				}
			},
			sets: {
				usesRange: !setsRangeDisabled,
				values: {
					min: Number(setsRangeMin),
					max: Number(setsRangeMax)
				}
			}
		};

		onUpdate(updatedExerciseObj);
	};

	const removeExercise = () => {
		onUpdate();
	};

	return (
		<Card
			sx={{
				display: 'flex',
				flexDirection: 'column',
				bgcolor: bgColor,
				marginLeft: '0.5rem',
				marginRight: '0.5rem',
				marginTop: '0.5rem'
			}}
		>
			<CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
				<TextField
					label="Exercise name"
					placeholder="Enter exercise name"
					{...exerciseNameProps}
					type={`${elemIndex}-exercise-name`}
					sx={{ marginBottom: '0.4rem' }}
				/>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'flex-start'
					}}
				>
					<TextField
						label={setsRangeDisabled ? 'Sets' : 'Min'}
						{...setsRangeMinProps}
						type={`${elemIndex}-sets-lower-bound`}
						sx={{ flexGrow: '1' }}
					/>
					{!setsRangeDisabled ? (
						<TextField
							label="Max"
							{...setsRangeMaxProps}
							type={`${elemIndex}-sets-upper-bound`}
							sx={{ flexGrow: '1', marginLeft: '0.4rem' }}
						/>
					) : null}
				</Box>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								onChange={() => setSetsRangeDisabled(state => !state)}
							/>
						}
						label="Use set range"
					/>
				</FormGroup>
				<Box sx={{ display: 'flex' }}>
					<TextField
						label={repRangeDisabled ? 'Reps' : 'Min'}
						{...repRangeMinProps}
						type={`${elemIndex}-reps-lower-bound`}
						sx={{ flexGrow: '1' }}
					/>
					{!repRangeDisabled ? (
						<TextField
							label="Max"
							{...repRangeMaxProps}
							type={`${elemIndex}-reps-upper-bound`}
							sx={{ flexGrow: '1', marginLeft: '0.4rem' }}
						/>
					) : null}
				</Box>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox onChange={() => setRepRangeDisabled(state => !state)} />
						}
						label="Use rep range"
					/>
				</FormGroup>
			</CardContent>
			<CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				<IconButton onClick={removeExercise}>
					<Delete />
					<Typography>Delete exercise</Typography>
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default ExerciseForm;
