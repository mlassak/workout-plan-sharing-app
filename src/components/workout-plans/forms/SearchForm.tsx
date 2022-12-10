import {
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	SelectChangeEvent,
	TextField,
	Typography
} from '@mui/material';
import { FC, useState } from 'react';

import useField from '../../../hooks/useField';
import { DifficultyLevel } from '../../../types';

const SearchForm: FC = () => {
	const [author, setAuthor] = useField('author', false);
	const [workoutsPerWeek, setWorkoutsPerWeek] = useField(
		'workoutsPerWeek',
		false
	);
	const [difficulty, setDifficulty] = useState<DifficultyLevel | 'All'>('All');

	return (
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
				Search wotkout plan based on your preferences
			</Typography>
			<TextField
				label="Author"
				placeholder="Enter the name of workout plans author"
				{...setAuthor}
				type="author"
			/>
			<TextField
				label="workoutsPerWeek"
				placeholder="Per week Workouts"
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
		</Paper>
	);
};

export default SearchForm;
