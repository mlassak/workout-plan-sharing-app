import { Card, CardContent, Typography } from '@mui/material';
import { FC } from 'react';

import { Exercise } from '../../../types';

const SessionCard: FC<Exercise> = ({ name, reps, sets }) => (
	<Card
		sx={{
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			bgcolor: '#616161',
			width: '100%',
			textAlign: 'left',
			padding: '5px'
		}}
	>
		<CardContent>
			<Typography>Excercise: {name}</Typography>
			<Typography>
				Number of sets:{' '}
				{sets.usesRange ? (
					<>
						{sets.values.min}-{sets.values.max}
					</>
				) : (
					<> {sets.values.min}</>
				)}
			</Typography>
			<Typography>
				Number of repetitions:{' '}
				{reps.usesRange ? (
					<>
						{reps.values.min}-{reps.values.max}
					</>
				) : (
					<> {reps.values.min}</>
				)}
			</Typography>
		</CardContent>
	</Card>
);

export default SessionCard;
